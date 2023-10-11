const { StatusCodes } = require("http-status-codes")
const Joi = require("joi")


exports.signInValidator = async (req, res, next) => {

    const expected = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(25).required()
    })

    const actual = {
        email: req.body.email,
        password: req.body.password
    }

    const { error } = expected.validate(actual);
    if (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "Validation Error! ", error: error.message })
    }
    next()
}


exports.signUpValidator = async (req, res, next) => {

    const expected = Joi.object({
        name: Joi.string().min(3).max(25).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(25).required(),
        confirm_password: Joi.string().valid(Joi.ref('password')).required().label('Confirm Password')
    })

    const actual = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        confirm_password: req.body.confirm_password
    }

    const { error } = expected.validate(actual)

    if (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "Validation Error! ", error: error.message })
    }

    next()
}
