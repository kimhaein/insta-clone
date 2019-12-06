import express from 'express'
import routes from '../routes'
import {getUserEdit, getUsers, postUserEdit} from '../controllers/UsersController'
const userRouter = express.Router()

userRouter.get('/:id', getUsers)
userRouter.get(routes.USER_EDIT, getUserEdit)
userRouter.post(routes.USER_EDIT, postUserEdit)

export default userRouter