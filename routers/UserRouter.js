import express from 'express'
import routes from '../routes'
import {getUserEdit, getUser, postUserEdit} from '../controllers/UsersController'
import { onlyPrivate } from "../middlewares";
const userRouter = express.Router()

//유저 상세
userRouter.get('/:id', getUser)
// 유저 수정
userRouter.get(routes.USER_EDIT, onlyPrivate, getUserEdit)
userRouter.post(routes.USER_EDIT, onlyPrivate, postUserEdit)

export default userRouter