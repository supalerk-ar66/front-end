
export async function getAllUsers() {

    try{
        const response = await fetch('http://localhost:3001/api/movie/all');
        return await response.json();
    }catch(error) {
        return [];
    }
    
}

export async function createUser(data) {
    const response = await fetch(`http://localhost:3001/api/movies`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({user: data})
      })
    return await response.json();
}