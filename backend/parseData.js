const osmosis = require('osmosis');


var result = function()
{
    osmosis
    .get('www.google.com')
    .set({'Title': 'title'})   // альтернатива: `.find('title').set('Title')`
    .data(console.log)  // выведет {'Title': 'Google'}
}

result()