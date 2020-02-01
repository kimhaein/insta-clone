import dbConfig from './dbConfig'

export default {
    getContentDetail(id){
        const sql = [
            `SELECT idx, fileUrl, creator, creator_email, title, value, regdate, likes, `,
            `(SELECT profile_img FROM users WHERE email = creator_email) AS profile_img,`,
            `(SELECT idx FROM users WHERE email = creator_email) AS creator_idx `,
            `FROM content `,
            (!id) ?`ORDER BY idx DESC`:`WHERE idx = ${id}`
        ].join('')
        return dbConfig.dbConnect
            .promise()
            .query(sql)
    },
    insertContent(content_img, creator, email, title, value) {
        const sql = [
        `INSERT INTO content (fileUrl, creator, creator_email, title, value, likes )`,
        `VALUES ('/${content_img}', '${creator}', '${email}', '${title}', '${value}', '' )`
        ].join('')
        return dbConfig.dbConnect
            .promise()
            .query(sql)
    },
    getUserContent(email) {
        const sql = [
            `SELECT idx, fileUrl, creator, creator_email, title, value, regdate `,
            `FROM content WHERE creator_email='${email}' ORDER BY idx DESC`,
            ].join('')
        
        return dbConfig.dbConnect
            .promise()
            .query(sql)
            .then(([rows]) => {
                return rows
            })
    },
    insertReply(content_id, user_email, reply) {
        const sql = [
            `INSERT INTO reply (content_id, user_email, reply)`,
            `VALUES ('${content_id}', '${user_email}', '${reply}')`
            ].join('')
        return dbConfig.dbConnect
            .promise()
            .query(sql)
    },
    getReply(content_id) {
        const sql = [
            `SELECT idx, content_id, user_email, reply, regdate,`,
            `(SELECT profile_img  FROM users WHERE email = user_email) AS profile_img,`,
            `(SELECT nickname FROM users WHERE email = user_email) AS nickname, `,
            `(SELECT idx FROM users WHERE email = user_email) AS user_idx `,
            `FROM reply `,
            `WHERE content_id = ${content_id}`,
        ].join('')
        return dbConfig.dbConnect
            .promise()
            .query(sql)
    },
    selectLikes(content_id) {
        const sql = [
            `SELECT likes FROM content WHERE idx = ${content_id}`
        ].join('')
        return dbConfig.dbConnect
            .promise()
            .query(sql) 
    },
    updateLikes(value, content_id) {
        const sql = [
            `UPDATE content `,
            `SET likes = '${value}'`,
            `WHERE idx = ${content_id}`
        ].join('')
        return dbConfig.dbConnect
            .promise()
            .query(sql) 
    }
}