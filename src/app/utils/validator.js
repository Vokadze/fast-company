export function validator(data, config) {
    const errors = {};
    function validate(validatorMethod, data, config) {
        switch (validatorMethod) {
            case "isRequired":
                if (data.trim() === "") return config.message;
                break;

            default:
                break;
        }
    }
    for (const fieldName in data) {
        for (const validatorMethod in config[fieldName]) {
            const error = validate(
                validatorMethod,
                data[fieldName],
                config[fieldName][validatorMethod]
            );
            if (error) {
                errors[fieldName] = error;
            }
        }
    }
    return errors;
}
