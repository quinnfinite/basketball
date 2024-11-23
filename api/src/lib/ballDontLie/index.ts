const BASE_URL = "https://api.balldontlie.io/v1/"

async function ballDontLieRequest<T> (apiKey:string , endpoint: string): Promise<T> {
    try {
        const url = `${BASE_URL}${endpoint}`;

        const response = await fetch(url, {
          headers: {
            "Authorization": apiKey
          }
        });

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
    
        const json = await response.json<{ data: T }>();
        return json.data;
      } catch (error) {
        let errorMessage = (error as Error).message;
        throw new Error(errorMessage);
      }
} 

export default ballDontLieRequest