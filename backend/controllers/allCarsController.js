const {DBManager} = require('../database/db')

exports.getCars = async (req, res) => {
    try {
        db = new DBManager()
        db.connect()
        result = await db.getCarsList()
        console.log(result)
        res.sendStatus(200).json(result.rows)
    } catch(err) {
        console.log(err)
    }
}