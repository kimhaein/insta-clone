import express from 'express'
import routes from '../routes'
import { onlyLogin, uploadContent} from "../middlewares";
import { getUpload, postUpload } from '../controllers/ContentController'
const contentRouter = express.Router()

contentRouter.get(routes.UPLOAD, onlyLogin, getUpload)
contentRouter.post(routes.UPLOAD, onlyLogin, uploadContent, postUpload)

export default contentRouter