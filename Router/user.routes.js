const express = require("express")
const router = express.Router()
const { SignInController, SignUpController, SignOutController } = require('../Controllers/user.controller')
const { signInValidator, signUpValidator } = require('../Utils/Validators/user.validator')



router.post('/signin', signInValidator, SignInController)
router.post('/signup', signUpValidator,SignUpController)
router.post('/signout', SignOutController)

module.exports = router