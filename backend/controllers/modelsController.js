const {DBManager} = require('../database/db')

exports.getModels = async (req, res) => {
    let markName = req.query.name
    try {
        db = new DBManager()
        await db.connect()
        result = await db.getMarkModels(markName)
        await db.close()
        res.json(result.rows)
    } catch(err) {
        console.log(err)
    }
}