import express from 'express'
import routes from '../routes'
import { getHome, getLogin, getJoin,postJoin, getLogout } from '../controllers/MainController'
import { onlyPublic, onlyPrivate, uploadAvatar} from "../middlewares";
const globalRouter = express.Router()

globalRouter.get(routes.HOME, getHome)
globalRouter.get(routes.LOGIN, getLogin)
globalRouter.get(routes.JOIN, onlyPublic, getJoin)
globalRouter.post(routes.JOIN, onlyPublic, uploadAvatar, postJoin)
globalRouter.get(routes.LOGOUT, getLogout)

export default globalRouter