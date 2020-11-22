
exports.addCar = (req, res) => {
    const car = req.body
    console.log(car)
    console.log(car.photo)
    res.sendStatus(200)
}