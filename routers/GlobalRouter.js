import express from 'express'
import routes from '../routes'
import passport from 'passport'
import { getHome, getLogin,postLogin, getJoin,postJoin, getLogout } from '../controllers/MainController'
import { isAuth,onlyPublic, onlyPrivate, uploadAvatar,passportMiddleware} from "../middlewares";

const globalRouter = express.Router()

globalRouter.get(routes.HOME, getHome)
// 로그인
globalRouter.get(routes.LOGIN,getLogin)
globalRouter.post(routes.LOGIN, passport.authenticate('local',{
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true 
}))
// 로그아웃
globalRouter.get(routes.LOGOUT, onlyPrivate, getLogout)
// 회원가입
globalRouter.get(routes.JOIN, getJoin)
globalRouter.post(routes.JOIN, uploadAvatar, postJoin)


export default globalRouter