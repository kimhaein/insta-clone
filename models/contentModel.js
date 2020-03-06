import dbConfig from './dbConfig'

export default {
    getContentDetail(id){
        const sql = [
            `SELECT idx, fileUrl, creator_email, hash_tag, value, regdate, likes, `,
            `(SELECT nickname FROM users WHERE email = creator_email) AS creator,`,
            `(SELECT profile_img FROM users WHERE email = creator_email) AS profile_img,`,
            `(SELECT idx FROM users WHERE email = creator_email) AS creator_idx `,
            `FROM content `,
            (!id) ?`WHERE is_deleted = 'N' ORDER BY idx DESC`:`WHERE idx = ${id} AND is_deleted = 'N'`
        ].join('')
        return dbConfig.dbConnect
            .promise()
            .query(sql)
    },
    insertContent(content_img, creator, email, hash_tag, value) {
        const sql = [
        `INSERT INTO content (fileUrl, creator, creator_email, hash_tag, value, likes )`,
        `VALUES ('/${content_img}', '${creator}', '${email}', '${hash_tag}', '${value}', '' )`
        ].join('')
        return dbConfig.dbConnect
            .promise()
            .query(sql)
    },
    updateContentEdit(field, id){
        const sql = `UPDATE content SET ${field} WHERE idx = ${id}`
        return dbConfig.dbConnect
            .promise()
            .query(sql)
    },
    deleteContent(){
        const sql = `UPDATE content SET ${field} WHERE idx = ${id}`
        return dbConfig.dbConnect
            .promise()
            .query(sql)
    },
    getUserContent(email) {
        const sql = [
            `SELECT idx, fileUrl, creator, creator_email, hash_tag, value, regdate `,
            `FROM content WHERE creator_email='${email}' AND is_deleted = 'N' ORDER BY idx DESC`,
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
    },
    getUserFollow(email) {
        const sql = [
            `SELECT a.from_follow FROM follow as a WHERE a.to_follow = '${email}'`
        ].join('')
        return dbConfig.dbConnect
            .promise()
            .query(sql) 
    },
    getUserFollowCount(email){
        const sql = [
            `SELECT count(a.from_follow) as follower, `,
            `(select count(a.to_follow) from follow as a where a.from_follow = '${email}') as follow `,
            `FROM follow as a `,
            `WHERE a.to_follow = '${email}'`
        ].join('')
        return dbConfig.dbConnect
            .promise()
            .query(sql) 
    }
}