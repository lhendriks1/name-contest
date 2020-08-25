module.exports = pgPool => {
    return {
        getUser(apiKey) {
            console.log('Hi!!!!')
            //return promise that resolves to users object
            return pgPool.query(`
            select * from users
            where api_key = $1
            `, [apiKey]).then(res => {
                return res.rows[0];
            });
        }
    }
}