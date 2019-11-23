import mysql2 from 'mysql2'
import env  from 'dotenv'
env.config()

const dbConnect = mysql2.createPool({
    host        : process.env.DBhost,
    port        : process.env.DBport,
    user        : process.env.DBuser,
    password    : process.env.DBpassword,
    database    : process.env.database,
    connectionLimit : 5
})
export default {
    dbConnect
}
