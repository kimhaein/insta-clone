import express from 'express'
import routes from '../routes'
import { onlyPrivate, uploadContent} from "../middlewares";
import { getUpload, postUpload } from '../controllers/ContentController'
const contentRouter = express.Router()

contentRouter.get(routes.UPLOAD, onlyPrivate, getUpload)
contentRouter.post(routes.UPLOAD, uploadContent, postUpload)

export default contentRouter