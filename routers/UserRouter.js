import express from 'express'
import routes from '../routes'
import {getUserEdit, getUser, postUserEdit, postUserLeave, postUserFollow} from '../controllers/UsersController'
import { onlyPrivate , uploadAvatar, onlyLogin } from "../middlewares";

const userRouter = express.Router()

//유저 상세
userRouter.get('/:id', getUser)

//유저 팔로우
userRouter.post(routes.FOLLOW, onlyLogin , postUserFollow)

// 유저 수정
userRouter.get(routes.USER_EDIT, onlyPrivate, getUserEdit)
userRouter.post(routes.USER_EDIT, onlyPrivate, uploadAvatar, postUserEdit)

// 유저 탈퇴
userRouter.post(routes.USER_LEAVE, onlyPrivate, postUserLeave)

export default userRouter