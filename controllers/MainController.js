import contentModel from '../models/contentModel'
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
        const contents = 'join'
        res.render("join", {pageTitle: "join", contents})
    } catch(err) {
        console.log(err)
        res.render("home")
    }
 }
