import express from 'express'
import routes from '../routes'
import {getUserEdit, getUsers, postUserEdit} from '../controllers/UsersController'
import { isAuth } from "../middlewares";
const userRouter = express.Router()

userRouter.get('/:id', getUsers)
userRouter.get(routes.USER_EDIT, isAuth, getUserEdit)
userRouter.post(routes.USER_EDIT, isAuth, postUserEdit)

export default userRouter