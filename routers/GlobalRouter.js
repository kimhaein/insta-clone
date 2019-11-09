import express from 'express'
import routes from '../routes'
import mainController from '../controllers/MainController'
const globalRouter = express.Router()

globalRouter.get(routes.HOME, mainController.home)

export default globalRouter