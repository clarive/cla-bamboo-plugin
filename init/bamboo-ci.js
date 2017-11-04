var ci = require("cla/ci");

ci.createRole("Bamboo");

ci.createClass("BambooServer", {
    form: '/plugin/cla-bamboo-plugin/form/bamboo-ci-form.js',
    icon: '/plugin/cla-bamboo-plugin/icon/bamboo.svg',
    roles: ["Bamboo", "ClariveSE"],
    has: {
        hostname: {
            is: "rw",
            isa: "Str",
            required: true
        },
        username: {
            is: "rw",
            isa: "Str",
            required: true
        },
        password: {
            is: "rw",
            isa: "Str",
            required: true
        },
        port: {
            is: "rw",
            isa: "Int",
            required: true
        }
    }

});

ci.createClass("BambooPlan", {
    form: '/plugin/cla-bamboo-plugin/form/bamboo-plan-ci-form.js',
    icon: '/plugin/cla-bamboo-plugin/icon/bamboo.svg',
    roles: ["Bamboo", "ClariveSE"],
    has: {
        projectKey: {
            is: "rw",
            isa: "Str",
            required: true
        },
        planKey: {
            is: "rw",
            isa: "Str",
            required: false
        },
        server: {
            is: "rw",
            isa: "ArrayRef",
            required: true
        }
    }
});
