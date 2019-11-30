import express from 'express'
import routes from '../routes'
import { getHome, getLogin, getJoin, getLogout } from '../controllers/MainController'
import { onlyPublic, onlyPrivate } from "../middlewares";
const globalRouter = express.Router()

globalRouter.get(routes.HOME, getHome)
globalRouter.get(routes.LOGIN, getLogin)
globalRouter.get(routes.JOIN, onlyPublic, getJoin)
globalRouter.get(routes.LOGOUT, getLogout)

export default globalRouter