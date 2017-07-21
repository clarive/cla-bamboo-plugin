(function(params) {

    var data = params.data;

    var hostnameTextField = Cla.ui.textField({
        name: 'hostname',
        fieldLabel: _('Hostname or IP'),
        allowBlank: false
    });

    var usernameTextField = Cla.ui.textField({
        name: 'username',
        fieldLabel: _('User'),
        allowBlank: false
    });

    var passwordTextField = Cla.ui.textField({
        name: 'password',
        fieldLabel: _('Password'),
        allowBlank: false,
        inputType: 'password'
    });

    var portNumberField = Cla.ui.numberField({
        name: 'port',
        fieldLabel: _('Port'),
        allowBlank: false,
        maxLength: '5'
    });

    return [
        hostnameTextField,
        portNumberField,
        usernameTextField,
        passwordTextField
    ]
})