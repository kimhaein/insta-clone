import dbConfig from './dbConfig'

export default {
    login(email) {
        const sql = `SELECT * FROM users WHERE email = '${email}'`
        return dbConfig.dbConnect
            .promise()
            .query(sql)
    }
}