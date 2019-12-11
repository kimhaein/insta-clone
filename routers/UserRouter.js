import express from 'express'
import routes from '../routes'
import {getUserEdit, getUsers, postUserEdit} from '../controllers/UsersController'
import { onlyPrivate} from "../middlewares";
const userRouter = express.Router()

userRouter.get('/:id', getUsers)
userRouter.get(routes.USER_EDIT, getUserEdit)
userRouter.post(routes.USER_EDIT, onlyPrivate, postUserEdit)

export default userRouter