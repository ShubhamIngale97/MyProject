export const _FIELD_TYPE = {
    TEXTINPUT: "TextInput",
    DROPDOWN: "DropDown",
    MULTISELECT: "MultiSelect",
    MULTITEXTINPUT: "MultiTextInput",
    COMPONENTVISIBILITYHANDLER: "ComponentVisibilityHandler",
    CUSTOMVALIDATETEXTINPUT: "CustomValidateTextInput",
    CUSTOMDOCUMENTPICKER: 'CustomDocumentPicker',
    CUSTOMRADIOPICKER: 'CustomRadioPicker',
    CUSTOMDATEPICKER: 'DatePicker',
    CUSTOMLOCATIONCAPTURE: 'locationCapture'
}

export const _FORMS = {
    LOGIN: [
        {
            fields: [{
                name: "User Name",
                _id: "uname",
                type: "TextInput",
                mode: "outlined",
                hasDefaultValue: false,
                keyboardType: "visible-password",
                secureText: false,
                fieldValidation: "EmptyFieldValidationAutoFill",
                contextMenuHidden: true,
                disabled: false,
                mandatory: true,
                textContentType:"username",
                autoComplete:"username",
                error: "User Name is Required"
            }, {
                name: "Password",
                _id: "password",
                type: "TextInput",
                autoCapitalize: "none",
                mode: "outlined",
                hasDefaultValue: false,
                disabled: false,
                keyboardType: "default",
                secureText: true,
                fieldValidation: "EmptyFieldValidationAutoFill",
                contextMenuHidden: true,
                textContentType:"password",
                mandatory: true,
                autoComplete:"password",
                error: "Password is Required"
            }
            ]
        }
    ]
};