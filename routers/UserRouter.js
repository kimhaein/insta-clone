import express from 'express'
import routes from '../routes'
import {getUserEdit, getUsers} from '../controllers/UserController'
const userRouter = express.Router()

userRouter.get('/:id', getUsers)
userRouter.get(routes.USER_EDIT, getUserEdit)

export default userRouter