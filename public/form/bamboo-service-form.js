(function(params) {

    var data = params.data;

    var optionComboBox = Cla.ui.comboBox({
        name: 'command',
        fieldLabel: _('Options'),
        data: [
            ['build', _('Trigger build')],
            ['result', _('Get build result')]
        ],
        value: data.command || 'build',
        allowBlank: false,
        anchor: '100%',
        singleMode: true
    });

    optionComboBox.on('addItem', function() {
        var v = optionComboBox.getValue();
        if (v == 'build') {
            buildNumber.hide();
            buildNumber.allowBlank = true;
        } else {
            buildNumber.show();
            buildNumber.allowBlank = false;
        }
    });

    var buildNumber = Cla.ui.textField({
        name: 'buildNumber',
        value: data.buildNumber || '',
        fieldLabel: _('Build Number'),
        allowBlank: true,
        hidden: (data.command != 'result')
    });

    var plan = Cla.ui.ciCombo({
        name: 'plan',
        value: data.plan || '',
        class: 'BambooPlan',
        fieldLabel: _('Bamboo plan'),
        allowBlank: false,
        with_vars: 1
    });

    var timeout = Cla.ui.numberField({
        name: 'timeout',
        value: data.timeout || '10',
        fieldLabel: _('Timeout (seconds)'),
        allowBlank: false
    });

    var checkTime = Cla.ui.numberField({
        name: 'checkTime',
        value: data.checkTime || '1',
        fieldLabel: _('Refresh time (seconds)'),
        allowBlank: false
    });

    return [
        optionComboBox,
        plan,
        buildNumber,
        timeout,
        checkTime
    ]
})