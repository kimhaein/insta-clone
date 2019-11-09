import mariadb from 'mariadb'
import env from 'dotenv'

const pool = mariadb.createPool({
    host        : process.env.DBhost,
    port        : process.env.DBport,
    user        : process.env.DBuser,
    password    : process.env.DBpassword,
    database    : process.env.database,
    connectionLimit : 5
})
export default pool