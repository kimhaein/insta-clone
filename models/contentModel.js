import dbConfig from './dbConfig'

export default {
    home() {
        const sql = 'select * from content'
        return dbConfig.dbConnect
            .promise()
            .query(sql)
            .then(([rows]) => {
                return rows
            })
    }
}