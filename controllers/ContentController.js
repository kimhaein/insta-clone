import contentModel from '../models/contentModel'

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
                // 회원가입 완료시 -> 로그인
                //res.redirect(routes.LOGIN);
            })
            .catch((e) => {
                // 회원가입 실시패 -> 홈
                //res.redirect(routes.JOIN);
            })
}