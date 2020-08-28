module.exports = pool => {
    return {
        getUser(apiKey) {
            console.log('Hi!!!!')
            //return promise that resolves to users object
            return pool.query(`
            select * from users
            where api_key = $1
            `, [apiKey]).then(res => {
                return res.rows[0];
            });
        }
    }
}