const osmosis = require('osmosis');
const fs = require('fs');
const pool = require('../database/db');
const { done } = require('osmosis');


function getVechileMarks()
{
    return new Promise((resolve, reject) => {
        let response
        let savedData = []  
        osmosis
            .get('https://auto.ru/catalog/cars/')
            .find('.search-form-v2-list .search-form-v2-list__text-item')
            .set({
                car : 'a'
            })
            .data(function(data) {
                console.log(data)
                savedData.push(data)
            })
            .data((res)=> response = savedData)
            .error(err => reject(err))
            .done(() => resolve(response))
    });
}



function getVeсhileModels() {
    return new Promise((resolve, reject) => {
		let response
		let savedData = []
        osmosis
            .get('https://auto.ru/catalog/cars/')
            .find('.search-form-v2-list .search-form-v2-list__text-item')
            .follow('@href')
            .find(".search-form-v2-mmm__breadcrumbs")
            .set({
              car : 'a'
            })
            .find(".search-form-v2-list__text-item")
            .set({
              model : 'a'
            }).data(function(data) {
				console.log(data)
            	savedData.push(data);
            })
            .data((res) => response = savedData)
            .error(err => reject(err))
            .done(() => resolve(response))
    });

}


InsertMarks = function(cars) {
    pool.connect((err, client, release) => {
        for (let car of Object.values(cars)) {
            client.query('INSERT INTO mark(id_mark, name) VALUES (DEFAULT, $1)', [car.car], (err, result) => {
            })
		}
		done()
		client.release()
    })
}

InsertModels = function(cars) {
  pool.connect(async (err, client, release) => {
    result = await client.query('SELECT * FROM mark')
    for (let car of Object.values(cars)) {
      try {
        await pool.query('INSERT INTO model VALUES(DEFAULT, (SELECT id_mark FROM mark WHERE name = $1), $2)', [car.car, car.model])
      } catch {}
	}
	done()
	client.release()
  })
}


function ParseDataFromAutoRu() {
	const marksJsonFile = 'marks.json'
	const modelsJsonFile = 'models.json'
    getVechileMarks().then(res => {
        fs.writeFile(marksJsonFile, JSON.stringify(res, null, 4), function(err) {
            if(err) console.error(err);
            else console.log('Data Saved to data.json file')})
        }).catch(err => {
            console.log(err)
		})		
	getVeсhileModels().then((res) => {
		console.log(res)
		fs.writeFile(modelsJsonFle, JSON.stringify(res, null, 4), function(err) {
		if(err) console.error(err);
		else console.log('Data Saved to data.json file')
	})}).catch(err => {
		console.log(err)
	})
    // let modelsJson = fs.readFileSync(modelsJsonFile);
    // let models = JSON.parse(modelsJson);
  
    // let marksJson = fs.readFileSync(marksJsonFile);
    // let marks = JSON.parse(marksJson);

    // InsertMarks(marks)
    // InsertModels(models)

    // try {
    //     fs.unlinkSync(marksJsonFile)
    //     fs.unlinkSync(modelsJsonFile)
    // } catch(err) {
    //     console.log
    // }
}

ParseDataFromAutoRu();

