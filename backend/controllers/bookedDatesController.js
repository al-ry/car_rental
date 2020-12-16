const {DBManager} = require('../database/db')

exports.getDates = async (req, res) => {
    let data = req.query   
    const db = new DBManager()        
    try {
        db.connect()
        rows = await db.getBookedDates(data.id)
        db.close()
        res.status(200).json(rows)
    } catch (err) {
        console.log(err)
        res.sendStatus(400)
    }
}