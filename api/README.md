# Basketball API

## Live Demo
[API Playground](https://basketball-api.quinn-royston.workers.dev/)  
[Tests Page](https://basketball-api.quinn-royston.workers.dev/static/test-results)

The above demo is hosted on Cloudflare Workers


## Local Setup

1. Register for API Key from [Ball Don't Lie](https://www.balldontlie.io/#getting-started)

1. Create ```.dev.vars``` file in root
Add ```BALL_DONT_LIE_API_KEY = {INSERT_YOUR_API_KEY}``` to .dev.

1. Install Dependencies
    ```
    npm install
    ```
1. Start Local Server
    ```
    npm run dev
    ```
1. Run Tests
    ```
    npm test
    ```