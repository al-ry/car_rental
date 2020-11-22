
exports.addCar = (req, res) => {
    car = req.body
    json = JSON.stringify(car)
    console.log(car)
    res.sendStatus(200)
}