import crypto from 'crypto'
import contentModel from '../models/contentModel'
import usersModel from '../models/usersModel'
import routes from '../routes'

export const getHome = async (req, res) => {
    try {
        const contents = await contentModel.home()
        res.render("home", {pageTitle: "Home", contents})
    } catch(err) {
        console.log(err)
        res.render("home", {pageTitle: "Home", contents: []})
    }
}

export const getLogin = async (req, res) => {
    try {
        const contents = '로그인'
        res.render("login", {pageTitle: "Login", contents})
    } catch(err) {
        console.log(err)
        res.render("login", {pageTitle: "Login", contents: []})
    }
}

export const getLogout = async (req, res) => {
    try {
        const contents = '로그아웃'
        res.render("logout", {pageTitle: "Logout", contents})
    } catch(err) {
        console.log(err)
        res.render("logout", {pageTitle: "Logout", contents: []})
    }
}

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
        const data = req.body

        // 비밀번호 해시화 
        data.password = crypto.createHash('sha512').update(`${data.email}@${data.password}`).digest('base64');
        usersModel.insertUser(data)
        .then((result) => {
            // 회원가입 완료시 -> 로그인
            res.redirect(routes.LOGIN);
        })
        .catch((e) => {
            // 회원가입 실시패 -> 홈
            res.redirect(routes.HOME);
        })

    
 }
