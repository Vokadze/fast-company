export function validator(data, config) {
    const errors = {};
    function validate(validatorMethod, data, config) {
        let statusValidate;
        switch (validatorMethod) {
            case "isRequired":
                statusValidate = data.trim() === "";
                break;
            case "isEmail": {
                const emailRegExp = /^\S+@\S+\.\S+$/g;
                statusValidate = !emailRegExp.test(data);
                break;
            }
            case "isCapitalSymbol": {
                const capitalRegExp = /[A-Z]+/g;
                statusValidate = !capitalRegExp.test(data);
                break;
            }
            case "isContainDigit": {
                const digitRegExp = /\d+/g;
                statusValidate = !digitRegExp.test(data);
                break;
            }
            case "min": {
                statusValidate = data.length < config.value;
                break;
            }
            case "isNameNonWhitespaceCharacter": {
                const NonWhitespaceCharacterRegExp = /^\S.+$/g;
                statusValidate = !NonWhitespaceCharacterRegExp.test(data.name);
                break;
            }
            case "isName": {
                const nameRegExp = /^[^a-z]+\s+[^a-z]+$/g;
                statusValidate = nameRegExp.test(data);
                break;
            }
            default:
                break;
        }
        if (statusValidate) return config.message;
    }
    for (const fieldName in data) {
        for (const validatorMethod in config[fieldName]) {
            const error = validate(
                validatorMethod,
                data[fieldName],
                config[fieldName][validatorMethod]
            );
            if (error && !errors[fieldName]) {
                errors[fieldName] = error;
            }
        }
    }
    return errors;
}
