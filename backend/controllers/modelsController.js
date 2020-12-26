const {DBManager} = require('../database/db')

exports.getModels = async (req, res) => {
    let markName = req.query.name
    const db = new DBManager()
    try {
        await db.connect()
        result = await db.getMarkModels(markName)
        await db.close()
        res.json(result.rows)
    } catch(err) {
        console.log(err)
    }
}