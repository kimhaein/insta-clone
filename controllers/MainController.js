import crypto from 'crypto'
import moment from 'moment'
import contentModel from '../models/contentModel'
import usersModel from '../models/usersModel'
import routes from '../routes'

moment.locale('ko')

/**
 * HOME
 * */
export const getHome = async (req, res) => {

    // 컨텐츠 가져오기
    const contents = await contentModel.getContentDetail()
        .then(([row])=>{
            return row
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

    // 베스트 팔로워 리스트 가져오기 
    const bestFollowing = await usersModel.selectBestFollowing()
        .then((result) => {
            return(result[0])
        })
    res.render("home", {
        pageTitle: "Home", 
        contents,
        user,
        bestFollowing
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
        body: { nickname, email, password , password2 },
        file
    } = req

    if(password !== password2) {
        req.flash('joinMessage','비밀번호가 일치 하지 않습니다.')
        res.redirect(routes.JOIN);
    }

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
