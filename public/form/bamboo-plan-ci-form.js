(function(params) {

    var data = params.rec;

    var serverComboBox = Cla.ui.ciCombo({
        name: 'server',
        value: data.server || '',
        class: 'BambooServer',
        fieldLabel: _('Bamboo Server'),
        allowBlank: false
    });
    var itemNameTextField = Cla.ui.textField({
        name: 'projectKey',
        fieldLabel: _('Project key'),
        allowBlank: false
    });
    var itemKeyTextField = Cla.ui.textField({
        name: 'planKey',
        fieldLabel: _('Plan key'),
        allowBlank: false
    });

    return [
        itemNameTextField,
        itemKeyTextField,
        serverComboBox
    ]
})