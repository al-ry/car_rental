var express = require('express')
const osmosis = require('osmosis');
var app = express()
const fs = require('fs');
const pool = require('./database/db');


//let rawdata = fs.readFileSync('data.json');
//let cars = JSON.parse(rawdata);


InsertMarks = function(cars) {
  isNewCar = true
  i = 0
  for (let car of Object.values(cars)) {
    if (isNewCar) {
      prev = car
      isNewCar = false
      continue
    }
    if (prev.car == car.car) {
      continue
    } else {
      prev = car
      i++
      pool.connect((err, client, release) => {
        if (err) {
          return console.error('Error acquiring client', err.stack)
        }
        client.query('INSERT INTO mark(id_mark, name) VALUES (DEFAULT, $1)', [car.car], (err, result) => {
          release()
          if (err) {
            return console.error('Error executing query', err.stack)
          }
          console.log(result.rows)
        })
      })
    }
  }
}

InsertModels = function(cars) {
  pool.connect(async (err, client, release) => {
    result = await client.query('SELECT * FROM mark')
    console.log(result.rows)
    //await pool.query('INSERT INTO model VALUES(DEFAULT, $1, $2)', [])
    for (let car of Object.values(cars)) {
      try {
        await pool.query('INSERT INTO model VALUES(DEFAULT, (SELECT id_mark FROM mark WHERE name = $1), $2)', [car.car, car.model])
      } catch (e) {
          console.log(e)
      }
    }    
  })
}

// pool.connect((err, client, release) => {
//   if (err) {
//     return console.error('Error acquiring client', err.stack)
//   }
//   client.query('SELECT * FROM mark',(err, result) => {
//     if (err) {
//       return console.error('Error executing query', err.stack)
//     }
//     console.log(result.rows)
//   })
//   release()
// })

// pool.connect(async (err, client, release) => {
//   result = await client.query('SELECT * FROM mark')
//   console.log(result.rows)

// })
//InsertMarks(cars);
//InsertModels(cars);

// pool.connect((err, client, release) => {
//   if (err) {
//     return console.error('Error acquiring client', err.stack)
//   }
//   client.query('select * from mark', (err, result) => {
//     release()
//     if (err) {
//       return console.error('Error executing query', err.stack)
//     }
//     console.log(result.rows)
//   })
// })

function getVechileMarks()
{
  return new Promise((resolve, reject) => {
    let response;
    let savedData = [];
    osmosis
        .get('https://auto.ru/catalog/cars/')
        .find('.search-form-v2-list .search-form-v2-list__text-item')
        .set({
          car : 'a',
        })
        .data(function(data) {
          console.log(data)
          savedData.push(data)
        })
        .data(() => response = savedData)
        .error(err => reject(err))
        .done(() => resolve(response))
});
}

function getVeсhileModels() {
    return new Promise((resolve, reject) => {
      let response;
      let savedData = [];
      osmosis
          .get('https://auto.ru/catalog/cars/')
          .find('.search-form-v2-list__text-column .search-form-v2-list__text-item')
          .follow('@href')
          .paginate('')
          .delay(200) 
          .find(".search-form-v2-mmm__breadcrumbs")
          .set({
            car : 'a',
          })
          .find(".search-form-v2-list__text-item")
          .set({
            model : 'a'
          })
          .data(function(data) {
            console.log(data)
            savedData.push(data)
          })
          .data(() => response = savedData)
          .error(err => reject(err))
          .done(() => resolve(response))
  });
}

// getVechileMarks().then(res => {
//   fs.writeFile('data1.json', JSON.stringify(res, null, 4), function(err) {
//     if(err) console.error(err);
//     else console.log('Data Saved to data.json file')})
//   }).catch(err => {
//   console.log(err)
// })


// getVeсhileModels().then(res => {
//   fs.writeFile('data.json', JSON.stringify(res, null, 4), function(err) {
//     if(err) console.error(err);
//     else console.log('Data Saved to data.json file')
// })}).catch(err => {
//   console.log(err)
// })


InsertMarks = function(cars) {
  pool.connect((err, client, release) => {
      for (let car of Object.values(cars)) {
          client.query('INSERT INTO mark(id_mark, name) VALUES (DEFAULT, $1)', [car.car], (err, result) => {
          })
  }
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
client.release()
})
}

function ParseDataFromAutoRu() {
	const marksJsonFile = 'marks.json'
	const modelsJsonFile = 'models.json'
  //   getVechileMarks().then(res => {
  //       fs.writeFile(marksJsonFile, JSON.stringify(res, null, 4), function(err) {
  //           if(err) console.error(err);
  //           else console.log('Data Saved to data.json file')})
  //       }).catch(err => {
  //           console.log(err)
	// 	})		
	// getVeсhileModels().then((res) => {
	// 	console.log(res)
	// 	fs.writeFile(modelsJsonFle, JSON.stringify(res, null, 4), function(err) {
	// 	if(err) console.error(err);
	// 	else console.log('Data Saved to data.json file')
	// })}).catch(err => {
	// 	console.log(err)
  // })
  
    let marksJson = fs.readFileSync(marksJsonFile);
    let marks = JSON.parse(marksJson);

    let modelsJson = fs.readFileSync(modelsJsonFile);
    let models = JSON.parse(modelsJson);

    InsertMarks(marks)
    InsertModels(models)

    try {
        //fs.unlinkSync(marksJsonFile)
        //fs.unlinkSync(modelsJsonFile)
    } catch(err) {
        console.log();
    }
}
ParseDataFromAutoRu()
