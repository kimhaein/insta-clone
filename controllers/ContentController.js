import moment from 'moment'
import contentModel from '../models/contentModel'
import routes from '../routes'

moment.locale('ko')

// 게시글 상세
export const getContent = async (req, res) => {
    const { contentsId } = req.params

    // 게시글
    const contents = await contentModel.getContentDetail(contentsId)
    .then(async([row])=>{
        return row
    }).catch((e)=>{
        console.log(e)
    })

    // 댓글
    const reply = await contentModel.getReply(contentsId)
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
            body: { hash_tag, value },
            file
        } = req
        const email = res.locals.user.email
        const nickname = res.locals.user.nickname
         
        contentModel.insertContent(file.path, nickname, email, hash_tag, value)
            .then((result) => {
                res.redirect(routes.HOME);
            })
            .catch((e) => {
                console.log(e)
                res.redirect(routes.UPLOAD);
            })
}

// 게시글 수정
export const getContentEdit = async (req, res) => {
    const { id } = req.params

    const contents = await contentModel.getContentDetail(id)
    .then(([row])=>{
        return row[0]
    }).catch((e)=>{
        console.log(e)
        res.render("home", {pageTitle: "Home", contents: []})
    })

    res.render("contentsEdit", {
        pageTitle: "ContentEdit",
        contents
    })
}

export const postContentEdit = (req, res) => {
    const { contentsId } = req.params
    const { body, file } = req
    const email = req.session.passport.user.email

    if ( email === body.creator_email) return res.redirect(routes.HOME)


    const field = Object.keys(body).map((key)=>{
        return `${key} = '${body[key]}'`
    })

    if(file){
        // 윈도우 서버에서 file.path가 "\"로 업로드 되는 문제 해결
        // "\" 를 "/"로 변환 하는 기능, 추후에 사용하는 곳이 더 발생하면 모듈화 진행 필요
        if(file && file.path.match(/\\/g) != null){
            let replaceCount = file.path.match(/\\/g).length;
            for(let count = 0; replaceCount > count; count++){
                field.push(`fileUrl = '/${file.path.replace('\\', '/')}'`)
            }
        }else {
            field.push(`fileUrl = '/${file.path}'`)
        }
    }

    contentModel.updateContentEdit(field.join(','),contentsId)
    .then(()=>{
        res.redirect(routes.CONTENTS_DETAIL(contentsId));
    }).catch((e)=>{
        res.redirect(routes.HOME)
    })
}

// 게시글 삭제
export const postContentDelete = (req, res) => {
    const { contentsId } = req.params
    const { email } = req.body
    const field = `is_deleted = "Y"`
    // if (req.session.passport.user.email !== email) return res.redirect(routes.HOME)

    contentModel.updateContentEdit(field,contentsId)
    .then(()=>{
        res.redirect("/")
    }).catch((e)=>{
        console.log(e)
        res.redirect(routes.HOME)
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
            let like_list = result[0][0].likes.split(',')
            let like = true
            let value = ''
            if(like_list.find( v => v === email)) {
                like = false
                like_list = like_list.filter( v => v != email)
                value = like_list.reduce((pre, v) => pre + v + ',')
            } else {
                value = result[0][0].likes + `${email},`
            }
            
            contentModel.updateLikes(value, content_idx)
            .then((result) => {
                const obj = {
                    likes: value,
                    likeOn: like
                }
                res.json(obj)
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

