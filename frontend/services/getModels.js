

export async function addCar(data) {
    const response = await fetch('/addCar', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    return await response.json;
}