import moment from 'moment'
import contentModel from '../models/contentModel'
import routes from '../routes'

moment.locale('ko')

// 게시글 상세
export const getContent = async (req, res) => {
    const { id } = req.params

    // 게시글
    const contents = await contentModel.getContentDetail(id)
    .then(async([row])=>{
        return row
    }).catch((e)=>{
        console.log(e)
    })

    // 댓글
    const reply = await contentModel.getReply(id)
    .then(([row])=>{
        return row.map((v,i) => {
            v.regdate = moment(v.regdate).fromNow()
            return v
        })
    })
    .catch((e)=>{
        console.log(e)
    })

    res.render("contentsDetail", {
        pageTitle: "게시글 상세",
        contents,
        reply
    })
}

// 게시글 업로드
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
            res.redirect(routes.CONTENTS_DETAIL(content_id));
        })
        .catch((e) => {
            console.log(e)
            res.redirect(routes.HOME);
        })
}

// 좋아요
export const postLike = async(req, res) => {
    const { content_idx } = req.body
    const email = res.locals.user.email
    contentModel.selectLikes(content_idx)
        .then((result) => {
            // todo ... 
            // likes에 내 메일값 있는지 체크해서 없으면 추가 있으면 제거
            const value = result[0][0].likes + `${email},`
            contentModel.updateLikes(value, content_idx)
            .then((result) => {
                res.json(value)
            })
            .catch((e) => {
                console.log(e)
                res.redirect(routes.HOME)
            })
        })
        .catch((e) => {
            console.log(e)
            res.redirect(routes.HOME)
        })
}

