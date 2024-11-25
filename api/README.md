# Basketball API

## Live Demo
[API Playground](https://basketball-api.quinn-royston.workers.dev/)  
[Tests Page](https://basketball-api.quinn-royston.workers.dev/static/test-results)

The above demo is hosted on Cloudflare Workers


## Local Setup

1. Register for API Key from [Ball Don't Lie](https://www.balldontlie.io/#getting-started)

1. Navigate to root directory of api

1. Create ```.dev.vars``` file in root (```/api```)

1. Add ```BALL_DONT_LIE_API_KEY = {INSERT_YOUR_API_KEY}``` to ```.dev.vars```

1. Install Dependencies
    ```
    npm install
    ```
1. Start Local Server
    ```
    npm run dev
    ```
1. Run Tests (optional)
    ```
    npm test
    ```

## Specific Endpoint that meets Assessment Criteria

Per instructions, I got a little creative and decided to add additional endpoints.

The endpoint that was built specifically for assesment criteria is:

Retrieve player count by draft round for a specific team ```/teams/{teamId}/playerCountByDraftRound```

See [player count by draft round in the api playground](https://basketball-api.quinn-royston.workers.dev/#tag/default/GET/teams/{teamId}/playerCountByDraftRound) for specific documentation

Based on assumptions, I added a few points of functionality. See [Assumptions Section](#Assumptions) below for more details.

## Assumptions

From the assessment doc: “So, we are looking for a consolidated data to see how many players are from round 1 and round 2.”

- The text suggests active players only, but the suggested endpoint does not differentiate, and the players/active endpoint is not available for free.
    - **Assumption**: The suggested https://www.balldontlie.io/api/v1/players endpoint is sufficient.

- The text also suggests only round 1 and round 2, but the example shows round 1, round 2, and null.
    - **Assumption**: The default rounds to be counted are rounds 1, 2, and null.
    - Just in case, the API allows for specified or all rounds to be included in the count

- The example also only displays the first 25 players.
    - **Assumption**: The default behavior should be to count based on the first 25 players
    - Just in case, the API allows counting ALL players from the Ball Dont Lie by draft round that belong to the specified team

- camelCase vs snake_case
    - **Assumption**: Because this api mostly returns data from an external API, I left the return shape (and return schemas) to use snake casing such as ```draft_round```, but maintained camel casing throughout the typescript code. If I was working with a team, this could change based on organizational standards/best practices.