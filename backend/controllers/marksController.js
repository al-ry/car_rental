const {DBManager} = require('../database/db')

exports.getMarks = async (req, res) => {
    const db = new DBManager()
    try {
        await db.connect()
        result = await db.getCarsList()
        await db.close()
        res.json(result.rows)
    } catch(err) {
        console.log(err)
        res.sendStatus(400)
    }
}