

export async function getMarks() {
    const response = await fetch('/marksList', {
        method: 'GET'
    })

    return await response.json();
}