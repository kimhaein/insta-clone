import express from 'express'
import routes from '../routes'
import { onlyLogin, uploadContent} from "../middlewares";
import { getContent, getUpload, postUpload ,postReply} from '../controllers/ContentController'

const contentRouter = express.Router()

// 게시글 상세
contentRouter.get('/:id', getContent)

// 게시글 업로드
contentRouter.get(routes.UPLOAD, onlyLogin, getUpload)
contentRouter.post(routes.UPLOAD, onlyLogin, uploadContent, postUpload)

// 댓글
contentRouter.post(routes.REPLY, onlyLogin, postReply)

export default contentRouter