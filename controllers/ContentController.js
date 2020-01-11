import contentModel from '../models/contentModel'
import routes from '../routes'

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
        const nickName = res.locals.user.nickname

        contentModel.insertContent(file.path, nickName, title, value)
            .then((result) => {
                console.log(result)
                res.redirect(routes.HOME);
            })
            .catch((e) => {
                console.log(e)
                res.redirect(routes.UPLOAD);
            })
}