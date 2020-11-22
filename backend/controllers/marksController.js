const {DBManager} = require('../database/db')

exports.getMarks = async (req, res) => {
    let markName = req.query.name
    console.log(markName)
    try {
        db = new DBManager()
        db.connect()
        result = await db.getMarkModels(markName)
        console.log(result)
        res.sendStatus(200).json(result)
    } catch(err) {
        console.log(err)
    }
}