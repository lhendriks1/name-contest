const humps = require('humps');

module.exports = pgPool => {
    console.log('hi')
    return {
        getUser(apiKey) {
            //read from db is async operation, so return a promise that will resolve to the expected obj
            return pgPool.query(`
            select * from users
            where api_key = $1
            `, [apiKey]).then(res => {
                console.log('after query')
                return humps.camelizeKeys(res.rows[0]);
            })
        }
    }
}