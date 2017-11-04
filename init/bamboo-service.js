var reg = require("cla/reg");

reg.register('service.bamboo.build', {
    name: _('Bamboo trigger'),
    icon: '/plugin/cla-bamboo-plugin/icon/bamboo.svg',
    form: '/plugin/cla-bamboo-plugin/form/bamboo-service-form.js',
    rulebook: {
        moniker: 'bamboo_trigger',
        description: _('Check bammbo build or execute it'),
        required: [ 'plan', 'option', 'timeout', 'check_time'],
        allow: ['plan', 'option', 'timeout', 'check_time', 'build_number'],
        mapper: {
            'check_time':'checkTime',
            'build_number':'buildNumber'
        },
        examples: [{
            bamboo_trigger: {
                option: 'build',
                plan: 'plan-resource',
                timeout: '10',
                check_time: '10'
            }
        },{
            bamboo_trigger: {
                option: 'result',
                plan: 'plan-resource',
                timeout: '10',
                check_time: '10',
                build_number: '12'
            }
        }]
    },
    handler: function(ctx, config) {

        var ci = require("cla/ci");
        var log = require('cla/log');
        var web = require("cla/web");
        var util = require("cla/util");
        var base64 = require("cla/base64");

        var plan = config.plan || "";
        var option = config.command || "build";
        var bambooPlan = ci.findOne({
            mid: plan + ''
        });
        if (!bambooPlan) {
            log.fatal(_("Plan CI doesn't exist"));
        }
        var bambooServer = ci.findOne({
            mid: bambooPlan.server + ''
        });
        if (!bambooServer) {
            log.fatal(_("Server CI doesn't exist"));
        }

        function triggerBuild(itemUrl, timeout, pause, headers) {
            log.debug(_("Triggering build"));
            try{
            return util.retry(function() {
                var trigger = agent.postForm(itemUrl, {}, {
                    headers: headers
                });
                var buildNumber = JSON.parse(trigger.content).buildNumber;
                if (buildNumber) {
                    return buildNumber;
                }
            }, {
                pause: pause,
                attempts: pause ? timeout / pause : 0
            });
        } catch (err){
            log.fatal(_("Build not triggered. Timeout Reached."), err.message);
        }
        };

        function getBuildResult(itemUrl, timeout, pause, headers) {
            log.debug(_("Getting Build Result"));
            try{
            return util.retry(function() {
                var triggerResult = agent.get(itemUrl, {
                    headers: headers
                });
                var result = JSON.parse(triggerResult.content).state;
                if (result != "Unknown") {
                    return result;
                } else {
                    log.fatal(_("Build not finished. Timeout Reached."));
                }
            }, {
                pause: pause,
                attempts: pause ? timeout / pause : 0
            });
            } catch (err){
                log.fatal(_("Build not finished. Timeout Reached."), err.message);
            }
        };

        var BASE_URL = 'http://' + bambooServer.hostname + ':' + bambooServer.port;
        var timeout = config.timeout || 10;
        var pause = config.checkTime || 1;
        var agent = web.agent({
            auto_parse: 0
        });
        var content,
            headers,
            itemUrl;

        if (option == "build") {

            var username = bambooServer.username;
            var password = bambooServer.password;
            var encodeAuthentication = base64.encode64(username + ":" + password);

            headers = {
                'accept': 'application/json',
                'content-type': 'application/json',
                'authorization': 'Basic ' + encodeAuthentication + ""
            };

            log.info(_("Triggering build for plan: ") + bambooPlan.name);

            itemUrl = BASE_URL + "/rest/api/latest/queue/" + bambooPlan.projectKey + "-" + bambooPlan.planKey;

            var buildNumber = triggerBuild(itemUrl, timeout, pause, headers);

            log.info(_("Trigger build finished, build number: ") + buildNumber);
            return buildNumber;
        } else {

            headers = {
                'accept': 'application/json'
            };

            log.info(_("Getting build result for plan: ") + bambooPlan.name);

            itemUrl = BASE_URL + "/rest/api/latest/result/" + bambooPlan.projectKey + "-" + bambooPlan.planKey + "-" + config.buildNumber;

            var buildResult = getBuildResult(itemUrl, timeout, pause, headers);

            log.info(_("Build result: ") + buildResult);
            return buildResult;

        }

    }
});