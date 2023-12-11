//require("joi-i18n")

const validate = (schema, field = "body", options = {}) => (req, res, next) => {
    const { error, value } = schema.validate(req[field])
    if (!error) {
        req[field] = value
        return next()
    }
    res.status(500).json(error.details[0].message)
}
module.exports = {
    validate
}