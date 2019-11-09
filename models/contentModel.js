import mariadb from 'mariadb'
import env  from 'dotenv'
let pool 
function makePool() {
    pool = mariadb.createPool({
        host        : process.env.DBhost,
        port        : process.env.DBport,
        user        : process.env.DBuser,
        password    : process.env.DBpassword,
        database    : process.env.database,
        connectionLimit : 5
    })
}
export default {
    getConnection(callback) {
        makePool()
        pool.getConnection()
            .then(conn => {
                callback(conn)
            }) .catch(err => {
                console.log('DB Connect error : ' + err)
            })
    },
    async getConnectionAsync() {
        makePool()
        try {
            let conn = await pool.getConnection()
            return conn
        } catch (err) {
            throw err
        }
    }
}