import express from 'express'
import routes from '../routes'
import { home } from '../controllers/MainController'
const globalRouter = express.Router()

globalRouter.get(routes.HOME, home)

export default globalRouter