const humps = require('humps'); // humps.camelizeKeys will camelize all keys (arrays and objects), even nested ones

module.exports = pool => {
    return {
        getUserByApiKey(apiKey) {
            //return promise that resolves to users object
            return pool.query(`
            select * from users
            where api_key = $1
            `, [apiKey]).then(res => {
                return humps.camelizeKeys(res.rows[0]); // modify to return first row since we know the query will return 1 row or 0 rows for bad keys
            });
        },
        getUserById(userId) {
            return pool.query(`
            select * from users
            where id = $1
            `, [userId]).then(res => {
                return humps.camelizeKeys(res.rows[0]);
            })
        },
        getContests(user) {
            return pool.query(`
                select * from contests
                where created_by = $1
            `, [user.id]).then(res => {
                return humps.camelizeKeys(res.rows);
            })
        },
        getNames(contest) {
            return pool.query(`
            select * from names
            where contest_id = $1
            `, [contest.id]).then(res => {
                return humps.camelizeKeys(res.rows)
            })
        }
    }
}