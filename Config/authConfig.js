const { StatusCodes } = require("http-status-codes")
const jwt = require('jsonwebtoken')

    exports.authenticated = async (req, res, next) => {

        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token === null) return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Unauthorized" })
        jwt.verify(token, process.env.ACCESS_TOKEN, (error, response) => {
            if (error) {
                return res.status(StatusCodes.FORBIDDEN).json({ message: "Forbidden" })
            }
            res.local = response
            next()
        })
    }


