export async function getAllMovies() {

    try{
        const response = await fetch('http://localhost:3001/api/movie/all');
       
        return await response.json();
    }catch(error) {
        return [];
    }
    
}

export async function createMovie(data) {
    const response = await fetch(`http://localhost:4000/api/movie/insert`, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({...data})
      })
    return await response.json();
}