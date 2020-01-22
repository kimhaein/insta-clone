import crypto from 'crypto'
import moment from 'moment'
import contentModel from '../models/contentModel'
import usersModel from '../models/usersModel'
import mainModel from '../models/mainModel'
import routes from '../routes'

moment.locale('ko')
/**
 * HOME
 * */
export const getHome = async (req, res) => {

    // 컨텐츠 가져오기
    const contents = await contentModel.home()
    .then(async ([row])=>{

        // 게시글의 Objct 형태로 변환
        const contentsObj = {}
        for (const v of row) {
            contentsObj[v.idx] = v
            contentsObj[v.idx].reply = []
        }

        // 해당 게시글들의 댓글 데이터 조합
        await contentModel.getReply(Object.keys(contentsObj).join(','))
        .then(([row])=>{
            for (const v of row) {
                v.regdate = moment(v.regdate).fromNow()
                contentsObj[v.content_id].reply.push(v)
            }
        })
        .catch((e)=>{
            console.log(e)
        })

        // 최종 데이터를 배열형태로 전환
        const contents = []
        for (const key in contentsObj) {
            contents.unshift(contentsObj[key])
        }

        return contents
    })
    .catch((e)=>{
        console.log(e)
    })

    // 로그인인 경우 유저정보 가져오기 : 프로필 수정 시 반영을 위해서 추가
    let user = {}
    if(req.isAuthenticated()){
        const id =req.session.passport.user.idx
        user = await usersModel.selectUser(id)
        .then(([row])=>{
            return row[0]
        }).catch((e)=>{
            console.log(e)
            res.render("home", {pageTitle: "Home", contents: []})
        })
    }

    res.render("home", {
        pageTitle: "Home", 
        contents,
        user
    })
}

/**
 * LOGIN
 * */
export const getLogin = async (req, res) => {
    res.render("login", {
        pageTitle: "Login", 
        loginErrMsg:req.flash('loginMessage')[0]
    })
}

/**
 * LOGOUT
 * */
export const getLogout = async (req, res) => {
    req.logout();
    res.redirect('/');
}

/**
 * JOIN
 * */
export const getJoin = async(req, res) => {
    const contents = '회원가입'
    res.render("join", {
        pageTitle: "join", 
        joinMessage:req.flash('joinMessage')[0]
    })
 }

 export const postJoin = async(req, res) => {
    const {
        body: { nickname, email, password },
        file
    } = req

    usersModel.selectFindUserByEmail(email)
    .then(([row])=>{
        if(row[0].total > 0){
            req.flash('joinMessage','이미 존재하는 아이디 입니다.')
            res.redirect(routes.JOIN);
        } else {
            // 비밀번호 해시화 
            const hashPassword = crypto.createHash('sha512').update(`${email}@${password}`).digest('base64');
            
            // 윈도우 서버에서 file.path가 "\"로 업로드 되는 문제 해결
            // "\" 를 "/"로 변환 하는 기능, 추후에 사용하는 곳이 더 발생하면 모듈화 진행 필요
            if(file.path.match(/\\/g) != null){
                let replaceCount = file.path.match(/\\/g).length;
                for(let count = 0;replaceCount > count; count++){
                    file.path = file.path.replace('\\', '/');
                }
            }

            usersModel.insertUser(nickname, email, hashPassword, file.path)
            .then((result) => {
                // 회원가입 완료시 -> 로그인
                res.redirect(routes.LOGIN);
            })
            .catch((e) => {
                // 회원가입 실시패 -> 홈
                res.redirect(routes.JOIN);
            })
        }
    }).catch((e)=>{
        console.log(e)
    })
 }

 /**
 * 
 * */
