import dbConfig from './dbConfig'

export default {
    home() {
        const sql = `select 
        idx,
        fileUrl,
        creator,
        creator_email,
        title,
        value,
        regdate,
        ( select profile_img 
          from users 
          where email = creator_email) as profile_img
       from
        content 
       order by idx desc`
        return dbConfig.dbConnect
            .promise()
            .query(sql)
    },
    insertContent(content_img, creator, email, title, value) {
        const sql = [
        `INSERT INTO content (fileUrl, creator, creator_email, title, value)`,
        `VALUES ('/${content_img}', '${creator}', '${email}', '${title}', '${value}')`
        ].join('')
        return dbConfig.dbConnect
            .promise()
            .query(sql)
    },
    getUserContent(email) {
        const sql = `select * from content where creator_email='${email}' order by idx desc`
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
            `(SELECT nickname  FROM users WHERE email = user_email) AS nickname `,
            `FROM reply `,
            `WHERE content_id IN (${content_id})`,
        ].join('')
        return dbConfig.dbConnect
            .promise()
            .query(sql)
    },
}