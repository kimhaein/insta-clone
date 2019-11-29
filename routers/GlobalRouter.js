import express from 'express'
import routes from '../routes'
import { home,login,logout } from '../controllers/MainController'
const globalRouter = express.Router()

globalRouter.get(routes.HOME, home)
globalRouter.get(routes.LOGIN, login)
globalRouter.get(routes.LOGOUT, logout)

export default globalRouter