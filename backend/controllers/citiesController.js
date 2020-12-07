const { DBManager } = require('../database/db')

exports.getCities = async (req, res) => {
    try {
        db = new DBManager()
        await db.connect()
        let cities = await db.getCities()
        await db.close()
        res.json(cities.rows)
    } catch (err) {
        console.log(err)
        res.sendStatus(400)
    }
}