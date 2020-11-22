

export async function getMarks() {
    const response = await fetch('/allCars', {
        method: 'GET'
    })

    return await response.json();
}