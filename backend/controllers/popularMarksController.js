const { DBManager } = require('../database/db')

exports.getPopularMarks = async (req, res) => {
    const db = new DBManager()
    var limit = req.query.limit
    try {
        await db.connect()
        rows = await db.getPopularMarksWithLimit(limit)
        await db.close()
        res.status(200).json(rows)
    } catch (err) {
        res.status(400).json({err: err.message})
    }
}