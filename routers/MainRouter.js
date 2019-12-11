import express from 'express'
import routes from '../routes'
import passport from 'passport'
import { getHome, getLogin,postLogin, getJoin,postJoin, getLogout } from '../controllers/MainController'
import { onlyPublic, onlyPrivate, uploadAvatar,passportMiddleware} from "../middlewares";

const mainRouter = express.Router()

mainRouter.get(routes.HOME, getHome)
// 로그인
mainRouter.get(routes.LOGIN,getLogin)
mainRouter.post(routes.LOGIN, passport.authenticate('local',{
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true 
}))
// 로그아웃
mainRouter.get(routes.LOGOUT, onlyPrivate, getLogout)
// 회원가입
mainRouter.get(routes.JOIN, getJoin)
mainRouter.post(routes.JOIN, uploadAvatar, postJoin)


export default mainRouter