export async function loginUser(info) {
    const response = await fetch('/loginUser', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(info)
    })

    return await response.json();
}