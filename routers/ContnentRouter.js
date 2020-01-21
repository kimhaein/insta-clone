import express from 'express'
import routes from '../routes'
import { onlyLogin, uploadContent} from "../middlewares";
import { getUpload, postUpload ,postReply} from '../controllers/ContentController'

const contentRouter = express.Router()

// 게시글
contentRouter.get(routes.UPLOAD, onlyLogin, getUpload)
contentRouter.post(routes.UPLOAD, onlyLogin, uploadContent, postUpload)

// 댓글
contentRouter.post(routes.REPLY, onlyLogin, postReply)

export default contentRouter