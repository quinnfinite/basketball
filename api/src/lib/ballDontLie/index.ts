const BASE_URL = "https://api.balldontlie.io/v1/"

async function ballDontLie<T> (apiKey:string , endpoint: string): Promise<T> {
    const url = `${BASE_URL}${endpoint}`;

    const response = await fetch(url, {
      headers: {
        "Authorization": apiKey
      }
    });

    if (!response.ok) {
      throw new Error(`Request to Ball Don't Lie Failed. Response status: ${response.status}`);
    }

    const json = await response.json<{ data: T }>();
    
    return json.data;
} 

export default ballDontLie