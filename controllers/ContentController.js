import contentModel from '../models/contentModel'
import routes from '../routes'

// 게시글
export const getUpload = async (req, res) => {
    try {
        res.render("upload", {pageTitle: "Upload"})
    } catch(err) {
        console.log(err)
        res.render("home", {pageTitle: "Home", contents: []})
    }   
}

export const postUpload = async(req, res) => {
        const {
            body: { title, value },
            file
        } = req
        const email = res.locals.user.email
        const nickname = res.locals.user.nickname
        
        contentModel.insertContent(file.path, nickname, email, title, value)
            .then((result) => {
                res.redirect(routes.HOME);
            })
            .catch((e) => {
                console.log(e)
                res.redirect(routes.UPLOAD);
            })
}

// 댓글
export const postReply = async(req, res) => {
    const { content_id, reply } = req.body
    const email = res.locals.user.email
    
    contentModel.insertReply(content_id, email, reply)
        .then((result) => {
            res.redirect(routes.HOME);
        })
        .catch((e) => {
            console.log(e)
            res.redirect(routes.UPLOAD);
        })
}

