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
    try {
        const contents = '로그인'
        res.render("login", {pageTitle: "Login", contents})
    } catch(err) {
        console.log('getLogin',req)
        res.render("login", {pageTitle: "Login", contents: []})
    }
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
    try {
        const contents = '회원가입'
        res.render("join", {pageTitle: "join", contents})
    } catch(err) {
        console.log(err)
        res.render("home")
    }
 }

 export const postJoin = async(req, res) => {
    const {
        body: { nickname, email, password },
        file
    } = req
    
    // 비밀번호 해시화 
    const hashPassword = crypto.createHash('sha512').update(`${email}@${password}`).digest('base64');
    usersModel.insertUser(nickname, email, hashPassword, file.path)
    .then((result) => {
        // 회원가입 완료시 -> 로그인
        res.redirect(routes.LOGIN);
    })
    .catch((e) => {
        // 회원가입 실시패 -> 홈
        res.redirect(routes.HOME);
    })
 }

 /**
 * 
 * */
