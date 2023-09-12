import express from 'express'
import passport from 'passport'
import userController from '../controllers/user.controller.js'
import userRollController from '../controllers/userRollValid.controller.js'
const { Router } = express
const { addCartToUserController } = userController
const { isUserRollValid } = userRollController
const userRouter = Router()

userRouter.post('/cartToUser', passport.authenticate('jwtAuth', {session:false}), isUserRollValid, addCartToUserController)

export default userRouter