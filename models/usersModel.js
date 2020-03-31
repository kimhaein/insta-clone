import dbConfig from './dbConfig'

export default {
    insertUser(nickname, email, password, profile_img) {
        const sql = [
        `INSERT INTO users (email, password, nickname, profile_img)`,
        `VALUES ('${email}', '${password}', '${nickname}', '/${profile_img}')`
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
    updateUser(field, userId){
        const sql = `UPDATE users SET ${field} WHERE idx = ${userId}`
        return dbConfig.dbConnect
            .promise()
            .query(sql)
    },
    selectFindUserByEmail(email){
        const sql = `SELECT COUNT(*) AS total FROM users WHERE email = '${email}' AND is_deleted = 'N'`
        return dbConfig.dbConnect
            .promise()
            .query(sql)
    },
    insertFollow(myEmail, targetEmail) {
        const sql = [
        `INSERT INTO follow (from_follow, To_follow) `,
        `VALUES ('${myEmail}', '${targetEmail}')`
        ].join('')
        return dbConfig.dbConnect
            .promise()
            .query(sql)
    },
    searchFollow(myEmail, targetEmail) {
        const sql = [
            `select count(*) as count `,
            `from follow `,
            `where from_follow = '${myEmail}' `,
            `and to_follow = '${targetEmail}' `
        ].join('')
        return dbConfig.dbConnect
            .promise()
            .query(sql)
    },
    deleteFollow(myEmail, targetEmail) {
        const sql = [
            `DELETE FROM follow `,
            `WHERE from_follow = '${myEmail}' `,
            `and to_follow = '${targetEmail}' `
        ].join('')
        return dbConfig.dbConnect
            .promise()
            .query(sql)
    },
    selectBestFollowing() {
        const sql = [
            `select to_follow as email, b.idx, b.nickname, b.profile_img, count(*) as count `,
            `from follow a `,
            `left join users b `,
            `on a.to_follow = b.email `,
            `group by to_follow `,
            `order by count desc limit 5 `
        ].join('')
        return dbConfig.dbConnect
            .promise()
            .query(sql)
    }
}