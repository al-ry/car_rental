const { DBManager } = require('../database/db')

exports.getCities = async (req, res) => {
    const db = new DBManager()
    try {
        await db.connect()
        let cities = await db.getCities()
        await db.close()
        res.json(cities.rows)
    } catch (err) {
        console.log(err)
        res.sendStatus(400)
    }
}