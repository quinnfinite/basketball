import { OpenAPIHono, createRoute } from '@hono/zod-openapi'
import { TeamNameAndPlayerCountSchema } from '../../schemas/team'
import { ErrorSchema } from '../../schemas/error'
import ballDontLie from '../../lib/ballDontLie'
import { TeamNameAndPlayerCount, PlayerCountByDraftRound, Player } from '../../types'
import { env } from 'hono/adapter'
import { HTTPException } from 'hono/http-exception'

const playerCountByDraftRound = new OpenAPIHono()

const route = createRoute({
    method: 'get',
    path: '/{teamId}/playerCountByDraftRound',
    summary: "Retrieve player count by draft round for a specific team",
    description: "A valid team id is required as part of the request. Valid team ids can be found by requesting all teams. NOTE: This endpoint will not return full team data. Only name, and player count by draft round",
    responses: {
      200: {
        content: {
          'application/json': {
            schema: TeamNameAndPlayerCountSchema,
          },
        },
        description: 'Object with team name and player count by draft round',
      },
      500: {
        content: {
          'application/json': {
            schema: ErrorSchema,
          },
        },
        description: "Object with error message, and cause"
      }
    },
})

const getplayerCountByDraftRound = (players: Array<Player>): PlayerCountByDraftRound => players.reduce((playerCount: PlayerCountByDraftRound, player: Player) => {
  const { draft_round: draftRound } = player

  const currentCountAtDraftRound = playerCount[draftRound]

  playerCount[draftRound] = currentCountAtDraftRound ? currentCountAtDraftRound + 1 : 1;

  return playerCount
}, {})

playerCountByDraftRound.openapi(
  route,
  async (c) => {
    const teamId = c.req.param('teamId')

    const { BALL_DONT_LIE_API_KEY } = env<{ BALL_DONT_LIE_API_KEY: string }>(c)

    const endpoint = `players?team_ids[]=${teamId}`

    try {

      const players: Array<Player> = await ballDontLie(BALL_DONT_LIE_API_KEY, endpoint)

      const playerCountByDraftRound = getplayerCountByDraftRound(players);

      const teamName = players[0].team.full_name

      const response: TeamNameAndPlayerCount = {
          team_name: teamName,
          draft_rounds: playerCountByDraftRound
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

export default playerCountByDraftRound