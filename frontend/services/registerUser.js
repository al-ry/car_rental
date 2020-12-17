
export async function registerUser(info) {
    const response = await fetch('/registerUser', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(info)
    })

    return await response;
}


