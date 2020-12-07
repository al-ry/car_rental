const osmosis = require('osmosis');
const fs = require('fs');
const { DBManager } = require('../database/db');

const url = 'https://ru.wikipedia.org/wiki/%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA_%D0%B3%D0%BE%D1%80%D0%BE%D0%B4%D0%BE%D0%B2_%D0%A0%D0%BE%D1%81%D1%81%D0%B8%D0%B8_%D1%81_%D0%BD%D0%B0%D1%81%D0%B5%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%D0%BC_%D0%B1%D0%BE%D0%BB%D0%B5%D0%B5_100_%D1%82%D1%8B%D1%81%D1%8F%D1%87_%D0%B6%D0%B8%D1%82%D0%B5%D0%BB%D0%B5%D0%B9'

function getOpenGraphMeta() {
    return new Promise((resolve, reject) => {
        let response;
        saved = []
        osmosis
            .get(url)
            .find('.wikitable tbody tr td a')
            .set({
                city: "@title"
            })
            .data(function(data) {
                if (Object.keys(data).length !== 0) {
                    saved.push(data)
                }
            })
            .error(err => reject(err))
            .done(() => resolve(saved));
    });
}

getOpenGraphMeta().then(async (res) => {
    try {
        db = new DBManager()
        await db.connect()
        await db.insertCities(res)
        await db.close()
    } catch (err) {
        console.log(err)
    }
}).catch(err => {
    console.log(err)
});