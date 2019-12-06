import contentModel from '../models/contentModel'
import usersModel from '../models/usersModel'
import routes from '../routes'

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
    const data = req.body
    
    const filed = Object.keys(data).map((key)=>{
        return `${key} = '${data[key]}'`
    }).join(',')

    usersModel.updateUser(filed,id)
    .then((result)=>{
        res.redirect(routes.USER_DETAIL(id));
    }).catch((e)=>{
        console.log(e)
        res.render("userEdit", {pageTitle: "userEdit", contents: []})
    })
}


export const getUsers = async (req, res) => {
    const { id } = req.params
    usersModel.selectUser(id)
    .then(([row])=>{
        res.render("users", {pageTitle: "Users", contents:row[0]})
    }).catch((e)=>{
        console.log(e)
        res.render("users", {pageTitle: "Users", contents: []})
    })
}
