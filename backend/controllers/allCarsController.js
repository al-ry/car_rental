const {DBManager} = require('../database/db')

exports.getCars = async (req, res) => {
    try {
        db = new DBManager()
        db.connect()
        result = await db.getCarsList()
        console.log(result.rows)
        res.json(result.rows)
    } catch(err) {
        console.log(err)
        res.sendStatus(400)
    }
}