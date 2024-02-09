import { env } from '../env.js';
import { apiConfig } from '../apiConfig.js';

export async function getAllMovies() {
    try {
        console.log('env: ' + env);
        console.log('apiConfig.bearer_token: ' + apiConfig[env].bearer_token);
        console.log('apiConfig.API_URL: ' + apiConfig[env].API_URL);
        
        const response = await fetch(`${apiConfig[env].API_URL}/api/movie/all`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${apiConfig[env].bearer_token}`,
            }
        });

        return await response.json();
    } catch (error) {
        console.error('Error fetching all movies:', error);
        return [];
    }
}



export async function createMovie(data) {
    try {

        const response = await fetch(apiConfig[env].API_URL + '/api/movie/insert', {
            //mode: 'no-cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiConfig[env].bearer_token}`,
            },
            body: JSON.stringify(data)

        })
        console.log('Create Movie response: ' + await response);

        // return  response.json();
        return response;
        
    } catch (error) {
        return [];
    }
}