const humps = require('humps'); // humps.camelizeKeys will camelize all keys, even nested ones

module.exports = pool => {
    return {
        getUser(apiKey) {
            //return promise that resolves to users object
            return pool.query(`
            select * from users
            where api_key = $1
            `, [apiKey]).then(res => {
                return humps.camelizeKeys(res.rows[0]); // modify to return first row since we know the query will return 1 row or 0 rows for bad keys
            });
        }
    }
}