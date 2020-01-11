import dbConfig from './dbConfig'

export default {
    home() {
        const sql = 'select * from content order by idx desc'
        return dbConfig.dbConnect
            .promise()
            .query(sql)
            .then(([rows]) => {
                return rows
            })
    },
    insertContent(content_img, creator, title, value) {
        const sql = [
        `INSERT INTO content (fileUrl, creator, title, value)`,
        `VALUES ('/${content_img}', '${creator}', '${title}', '${value}')`
        ].join('')
        return dbConfig.dbConnect
            .promise()
            .query(sql)
    }
}