const User = require("../Models/user.model")
const { StatusCodes } = require("http-status-codes")
const jwt = require("jsonwebtoken")
const { compare, hashSync } = require("bcrypt")

exports.SignInController = async (req, res) => {
    try {

        const { email, password } = req.body
        
        const user = await User.findOne({ email, isDeleted: false })

        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "User does not exist", error: error })
        }

        const isPasswordCorrect = await compare(password, user.password)
        if (!isPasswordCorrect) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid Credentials" })
        }

        const token = jwt.sign({ email }, process.env.ACCESS_TOKEN, { expiresIn: '8h' })

        res.status(StatusCodes.OK).json({ message: "Signed in Successfuly", data: { name: user.name, email: user.email, deleted: user.isDeleted }, token })

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Someting went wrong try again later", error: error.message })
    }
}

exports.SignUpController = async (req, res) => {
    try {
        const { name, email, password, confirm_password } = req.body

        console.log(req.body)
        const userExist = await User.findOne({ email, isDeleted: false })
        if (userExist) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "User with this email already exist, Please choose another" })
        }

        const hashedPassword = await hashSync(password, 10)
        const hashConfirmPassword = await hashSync(confirm_password, 10)


        const result = await new User({
            name,
            email,
            password: hashedPassword,
            confirm_password: hashConfirmPassword
        })


        if (!result) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid inputs", error: error })
        }

        await result.save()

        return res.status(StatusCodes.OK).json({ message: "User Successfully Registered", data: result })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Some Error Occured try again later', error: error.message })
    }
}

exports.SignOutController = async (req, res) => {
    try {

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Some Error Occured try again later', error: error })

    }
}
