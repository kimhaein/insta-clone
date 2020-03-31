import contentModel from '../models/contentModel'
import usersModel from '../models/usersModel'
import routes from '../routes'

/**
 * UserEdit
 * */
export const getUserEdit = async (req, res) => {
    const { id } = req.params
    usersModel.selectUser(id)
    .then(([row])=>{
        res.render("userEdit", {pageTitle: "userEdit", contents:row[0]})
    }).catch((e)=>{
        console.log(e)
        res.render("userEdit", {pageTitle: "userEdit", contents: []})
    })
}

export const postUserEdit = async (req, res) => {
    const { id } = req.params
    const {
        body, 
        file
    } = req

    const field = Object.keys(body).map((key)=>{
        return `${key} = '${body[key]}'`
    })

    if(file){
        // 윈도우 서버에서 file.path가 "\"로 업로드 되는 문제 해결
        // "\" 를 "/"로 변환 하는 기능, 추후에 사용하는 곳이 더 발생하면 모듈화 진행 필요
        if(file && file.path.match(/\\/g) != null){
            let replaceCount = file.path.match(/\\/g).length;
            for(let count = 0; replaceCount > count; count++){
                field.push(`profile_img = '/${file.path.replace('\\', '/')}'`)
            }
        }else {
            field.push(`profile_img = '/${file.path}'`)
        }
    }

    usersModel.updateUser(field.join(','),id)
    .then((result)=>{
        res.redirect(routes.USER_DETAIL(id));
    }).catch((e)=>{
        console.log(e)
        res.render("userEdit", {pageTitle: "userEdit", contents: []})
    })
}

/**
 * User
 * */
export const getUser = (req, res) => {
    const { id } = req.params
    usersModel.selectUser(id)
        .then(([row])=>{
            const userInfo = row[0]
            let contents
            contentModel.getUserContent(userInfo.email)
                .then((result) => {
                    const contents = result
                    contentModel.getUserFollow(userInfo.email)
                        .then((row2) => {
                            const followInfo = row2[0].map((v) => v.from_follow)
                            contentModel.getUserFollowCount(userInfo.email)
                                .then((row3) => {
                                    
                                    res.render("users", {pageTitle: "Users", followCnt: row3[0][0], followInfo, contents, userInfo})
                                })
                        })
                })
    }).catch((e)=>{
        console.log(e)
        res.render("users", {pageTitle: "Users", contents: []})
    })
}

export const postUserLeave = (req, res) => {
    const { id } = req.params
    const field = `is_deleted = "Y"`

    usersModel.updateUser(field,id)
    .then((result)=>{
        req.logout()
        res.redirect("/")
    }).catch((e)=>{
        console.log(e)
        res.render("userEdit", {pageTitle: "userEdit", contents: []})
    })
}


export const postUserFollow = async(req, res) => {
    const { target } = req.body
    const myEmail = res.locals.user.email
    let count
    await usersModel.searchFollow(myEmail, target)
        .then((result) => {
            count = result[0][0].count
        })
    if(count) {
        usersModel.deleteFollow(myEmail, target)
            .then((result) => {
                contentModel.getUserFollowCount(target)
                    .then((row3) => {
                        const obj = {
                            followCnt: row3[0][0],
                        }
                        res.json(obj)
                    })
            })
    } else {
        usersModel.insertFollow(myEmail, target)
            .then((result)=> {
                contentModel.getUserFollowCount(target)
                    .then((row3) => {
                        const obj = {
                            followCnt: row3[0][0],
                        }
                        res.json(obj)
                    })
            })
    }
    
}
