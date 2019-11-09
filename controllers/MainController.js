import routes from '../routes'
import content from '../models/contentModel'
export default {
    home : async function(req, res) {
        content.getConnection(function(conn) {
            conn.query('select * from content')
                .then((results) => {
                    conn.end()
                    res.render("home", {pageTitle: "Home", contents: results})
                })
                .catch(err => {
                    console.log(err)
                    conn.end()
                })
        })
    }
}