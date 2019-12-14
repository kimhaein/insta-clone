import dbConfig from './dbConfig'

export default {
    login(email) {
        const sql = `SELECT * FROM users WHERE email = '${email}' AND is_deleted = 'N'`
        return dbConfig.dbConnect
            .promise()
            .query(sql)
    }
}