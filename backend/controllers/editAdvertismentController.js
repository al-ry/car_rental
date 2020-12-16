const { DBManager } = require('../database/db')

exports.edit = async (req, res) => {
    console.log('editing..')
    try {
        db = new DBManager()
        await db.connect()
        await db.close()
        res.sendStatus(200)
    } catch (err) {
        console.log(err)
        res.sendStatus(400)
    }
}