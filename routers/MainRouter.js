import express from 'express'
import routes from '../routes'
import passport from 'passport'
import { getHome, getLogin,postLogin, getJoin,postJoin, getLogout } from '../controllers/MainController'
import { onlyPublic, onlyLogin, uploadAvatar} from "../middlewares";

const mainRouter = express.Router()

mainRouter.get(routes.HOME, getHome)

// 로그인
mainRouter.get(routes.LOGIN, onlyPublic, getLogin)
mainRouter.post(routes.LOGIN, onlyPublic, passport.authenticate('local', {
  successRedirect: routes.HOME,
  failureRedirect: routes.LOGIN,
  failureFlash: true,
}));

// 로그아웃
mainRouter.get(routes.LOGOUT, onlyLogin, getLogout)

// 회원가입
mainRouter.get(routes.JOIN, onlyPublic, getJoin)
mainRouter.post(routes.JOIN, onlyPublic, uploadAvatar, postJoin)


export default mainRouter