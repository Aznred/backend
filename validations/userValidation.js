function validateDto(dto, schema) {
    const keys = Object.keys(schema);
    const result = {
        valid: true,
        errors: []
    };
    keys.forEach((key) => {
        if (schema[key].required && dto[key] === undefined) {
            result.valid = false;
            result.errors.push(`${key} is required.`);
        }
    });
    return result;
}

module.exports = { validateDto };