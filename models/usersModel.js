import dbConfig from './dbConfig'

export default {
    insertUser(nickname, email, password, profile_img) {
        const sql = [
        `INSERT INTO users (email, password, nickname, profile_img)`,
        `VALUES ('${email}', '${password}', '${nickname}', '${profile_img}')`
        ].join('')
        return dbConfig.dbConnect
            .promise()
            .query(sql)
    },
    selectUser(userId) {
        const sql = `SELECT * FROM users WHERE idx = ${userId} AND is_deleted = 'N'`
        return dbConfig.dbConnect
            .promise()
            .query(sql)
    },
    updateUser(filed, userId){
        const sql = `UPDATE users SET ${filed} WHERE idx = ${userId}`
        return dbConfig.dbConnect
            .promise()
            .query(sql)
    },
    selectFindUserByEmail(email){
        const sql = `SELECT * FROM users WHERE email = '${email}' AND is_deleted = 'N'`
        return dbConfig.dbConnect
            .promise()
            .query(sql)

    }
}