import dbConfig from './dbConfig'

export default {
    insertUser(data) {
        const sql = [
        `INSERT INTO users (email, password, nickname, profile_img)`,
        `VALUES ('${data.email}', '${data.password}', '${data.nickname}', '${data.profile_img}')`
        ]
        return dbConfig.dbConnect
            .promise()
            .query(sql.join(''))
    },
    selectUser(userId) {
        const sql = [`SELECT * FROM users WHERE idx = ${userId}`]
        return dbConfig.dbConnect
            .promise()
            .query(sql.join(''))
    },
    updateUser(filed, userId){
        const sql = [`UPDATE users SET ${filed} WHERE idx = ${userId}`]
        return dbConfig.dbConnect
            .promise()
            .query(sql.join(''))
    }
}