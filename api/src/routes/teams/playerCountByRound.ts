import { OpenAPIHono, createRoute } from '@hono/zod-openapi'
import { TeamNameAndPlayerCountSchema } from '../../schemas/team'
import { ErrorSchema } from '../../schemas/error'
import ballDontLie from '../../lib/ballDontLie'
import { TeamNameAndPlayerCount, PlayerCountByDraftRound, Player } from '../../types'
import { env } from 'hono/adapter'
import { HTTPException } from 'hono/http-exception'

const playerCountByRound = new OpenAPIHono()

const route = createRoute({
    method: 'get',
    path: '/{teamId}/playerCountByRound',
    responses: {
      200: {
        content: {
          'application/json': {
            schema: TeamNameAndPlayerCountSchema,
          },
        },
        description: 'Retrieve player count by round for a specific team',
      },
      500: {
        content: {
          'application/json': {
            schema: ErrorSchema,
          },
        },
        description: "Error team and player count by round"
      }
    },
})

const getPlayerCountByRound = (players: Array<Player>): PlayerCountByDraftRound => players.reduce((playerCount: PlayerCountByDraftRound, player: Player) => {
  const { draft_round: draftRound } = player

  const currentCountAtDraftRound = playerCount[draftRound]

  playerCount[draftRound] = currentCountAtDraftRound ? currentCountAtDraftRound + 1 : 1;

  return playerCount
}, {})

playerCountByRound.openapi(
  route,
  async (c) => {
    const teamId = c.req.param('teamId')

    const { BALL_DONT_LIE_API_KEY } = env<{ BALL_DONT_LIE_API_KEY: string }>(c)

    const endpoint = `players?team_ids[]=${teamId}`

    try {

      const players: Array<Player> = await ballDontLie(BALL_DONT_LIE_API_KEY, endpoint)

      const playerCountByRound = getPlayerCountByRound(players);

      const teamName = players[0].team.full_name

      const response: TeamNameAndPlayerCount = {
          team_name: teamName,
          draft_rounds: playerCountByRound
      }

      return c.json(
          response,
          200
      )
    } catch(error) {

      const message = `Error retrieving players with teamId ${teamId}.\nConfirm the teamId uses is valid and try again`;

      const cause = (error as Error).message;

      throw new HTTPException(500, { message, cause })

    }
  }
)

export default playerCountByRound