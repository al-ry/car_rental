
exports.addCar = (req, res) => {
    const car = req.body
    console.log(car)
    res.sendStatus(200)
}