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
            .then(([rows]) => {
                return rows
            })
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
    }
}