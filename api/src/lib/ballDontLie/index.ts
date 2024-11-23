const BASE_URL = "https://api.balldontlie.io/v1/"

const ballDontLieRequest = async (apiKey:string , endpoint: string) => {
    console.log({ apiKey, endpoint })
    try {
        const url = `${BASE_URL}${endpoint}`;
        console.log('URL TO REQUEST - ', url)
        const response = await fetch(url, {
          headers: {
            "Authorization": apiKey
          }
        });
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
    
        const json = await response.json();
        return json;
      } catch (error) {
        let errorMessage = (error as Error).message;
        throw new Error(errorMessage);
      }
} 

export default ballDontLieRequest