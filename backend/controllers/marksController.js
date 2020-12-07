const {DBManager} = require('../database/db')

exports.getMarks = async (req, res) => {
    try {
        db = new DBManager()
        await db.connect()
        result = await db.getCarsList()
        await db.close()
        res.json(result.rows)
    } catch(err) {
        console.log(err)
        res.sendStatus(400)
    }
}