const {DBManager} = require('../database/db')

exports.getModels = async (req, res) => {
    let markName = req.query.name
    console.log(markName)
    try {
        db = new DBManager()
        db.connect()
        result = await db.getMarkModels(markName)
        console.log(result)
        res.json(result.rows)
    } catch(err) {
        console.log(err)
    }
}