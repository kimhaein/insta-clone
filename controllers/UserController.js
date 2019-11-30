import contentModel from '../models/contentModel'

export const getUserEdit = async (req, res) => {
    try {
        const contents = 'userEdit'
        res.render("userEdit", {pageTitle: "userEdit", contents})
    } catch(err) {
        console.log(err)
        res.render("userEdit", {pageTitle: "userEdit", contents: []})
    }
}

export const getUsers = async (req, res) => {
    try {
        const contents = `users -${req.params.id}`
        res.render("users", {pageTitle: "Users", contents})
    } catch(err) {
        console.log(err)
        res.render("users", {pageTitle: "Users", contents: []})
    }
}

