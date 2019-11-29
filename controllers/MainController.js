import contentModel from '../models/contentModel'

export const home = async (req, res) => {
    try {
        const contents = await contentModel.home()
        res.render("home", {pageTitle: "Home", contents})
    } catch(err) {
        console.log(err)
        res.render("home", {pageTitle: "Home", contents: []})
    }
}

export const login = async (req, res) => {
    try {
        const contents = '로그인'
        res.render("login", {pageTitle: "Login", contents})
    } catch(err) {
        console.log(err)
        res.render("login", {pageTitle: "Login", contents: []})
    }
}

export const logout = async (req, res) => {
    try {
        const contents = '로그아웃'
        res.render("logout", {pageTitle: "Logout", contents})
    } catch(err) {
        console.log(err)
        res.render("logout", {pageTitle: "Logout", contents: []})
    }
}

