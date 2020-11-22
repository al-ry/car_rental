
exports.addCar = (req, res) => {
    car = req.body
    json = JSON.stringify(car)
    console.log(json)

    console.log(car)
    res.sendStatus(200)
}