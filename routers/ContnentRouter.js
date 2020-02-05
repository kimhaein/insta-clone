import express from 'express'
import routes from '../routes'
import { onlyLogin, uploadContent, onlyPrivate} from "../middlewares";
import { getContent, getUpload, postUpload ,getContentEdit, postContentEdit, postReply, postLike} from '../controllers/ContentController'
const contentRouter = express.Router()

// 게시글 상세
contentRouter.get('/detail/:id', getContent)

// 게시글 업로드
contentRouter.get(routes.UPLOAD, onlyLogin, getUpload)
contentRouter.post(routes.UPLOAD, onlyLogin, uploadContent, postUpload)

// 게시글 수정
contentRouter.get(routes.EDIT, getContentEdit)
contentRouter.post(routes.EDIT, uploadContent, postContentEdit)

// 댓글
contentRouter.post(routes.REPLY, onlyLogin, postReply)

// 좋아요
contentRouter.post(routes.LIKE, onlyLogin, postLike)

export default contentRouter