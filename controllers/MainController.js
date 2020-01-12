import crypto from 'crypto'
import contentModel from '../models/contentModel'
import usersModel from '../models/usersModel'
import mainModel from '../models/mainModel'
import routes from '../routes'

/**
 * HOME
 * */
export const getHome = async (req, res) => {
    try {
        const contents = await contentModel.home()
        console.log(contents)
        res.render("home", {
            pageTitle: "Home", 
            contents,
        })
    } catch(err) {
        console.log(err)
        res.render("home", {pageTitle: "Home", contents: []})
    }
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
            let replaceCount = file.path.match(/\\/g).length;
            for(let count = 0;replaceCount > count; count++){
                file.path = file.path.replace('\\', '/');
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
