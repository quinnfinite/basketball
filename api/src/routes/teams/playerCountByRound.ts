import { createRoute } from '@hono/zod-openapi'
import { TeamNameAndPlayerCountSchema } from '../../schemas/team'
import ballDontLieRequest from '../../lib/ballDontLie'
import { PlayerCountByRound, Player } from '../../types'

interface PlayerCountByRoundResponse {
    team_name: string,
    draft_rounds: PlayerCountByRound
}

const route = createRoute({
    method: 'get',
    path: '/{id}/playerCountByRound',
    responses: {
      200: {
        content: {
          'application/json': {
            schema: TeamNameAndPlayerCountSchema,
          },
        },
        description: 'Retrieve player count by round for a specific team',
      },
    },
})

const handler = async (c) => {
    const teamId = c.req.param('id')

    const { BALL_DONT_LIE_API_KEY } = c.env

    const endpoint = `players?team_ids[]=${teamId}`
    
    const players: Array<Player> = await ballDontLieRequest(BALL_DONT_LIE_API_KEY, endpoint)
    
    const playerCountByRound: PlayerCountByRound = players.reduce((playerCount: PlayerCountByRound, player: Player) => {
        
        const { draft_round: draftRound } = player

        const currentCountAtDraftRound = playerCount[draftRound]

        playerCount[draftRound] = currentCountAtDraftRound ? currentCountAtDraftRound + 1 : 1;

        return playerCount
    }, {})
    
    const teamName = players[0].team.full_name

    const response: PlayerCountByRoundResponse = {
        team_name: teamName,
        draft_rounds: playerCountByRound
    }

    return c.json(
        response,
        200
    )
}

export { route, handler };