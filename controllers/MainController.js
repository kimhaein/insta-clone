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