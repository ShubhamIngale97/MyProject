export const _VALIDATIONS = {
    EmptyFieldValidation: (value, pattern, callback) => {
        if (value?.length <= 0) {
            return callback({
                type: 0,
                status: false
            });
        } else {
            return callback && callback({
                type: 0,
                status: _VALIDATIONS.ValidatePatterns(value, pattern)
            });
        }
    },
    EmptyFieldValidationAutoFill: (value, pattern, callback) => {
        if (value?.length <= 0) {
            return callback({
                type: 1,
                status: false,
                value
            });
        } else {
            return callback && callback({
                type: 1,
                status: _VALIDATIONS.ValidatePatterns(value, pattern),
                value
            });
        }
    },
    ValidatePatterns: (text, pattern) => {
        if (!pattern) return true;
        let isValid = true;
        if (pattern.fixLength && text.length != pattern.fixLength) {
            isValid = false;
        }
        if (pattern.minLength && text.length < pattern.minLength) {
            isValid = false;
        }
        if (pattern.regex && !pattern.regex.test(text)) {
            isValid = false;
        }

        return isValid;
    },
}