const axios = require('axios');

export async function getModels(markName) {
    const response = await axios.get('/modelsList', {
        params: {
            name: markName
          }
    })

    return await response.data;
}