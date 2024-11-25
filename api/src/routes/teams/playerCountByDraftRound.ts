import { OpenAPIHono, createRoute } from '@hono/zod-openapi'
import {
  RetrievePlayersCountByDraftRoundQuerySchema,
  RetrieveTeamParamsSchema,
  TeamNameAndPlayerCountSchema
} from '../../schemas/team'
import { pick } from '../../helpers'
import { ErrorSchema } from '../../schemas/error'
import ballDontLie from '../../lib/ballDontLie'
import type { TeamNameAndPlayerCount, PlayerCountByDraftRound, Player, Players } from '../../types'
import { env } from 'hono/adapter'
import { HTTPException } from 'hono/http-exception'
import { DEFAULT_CURSOR, MAX_CURSOR } from '../../constants'

const playerCountByDraftRound = new OpenAPIHono()

const route = createRoute({
    method: 'get',
    path: '/{teamId}/playerCountByDraftRound',
    summary: "Retrieve player count by draft round for a specific team",
    description: "A valid team id is required as part of the request. Valid team ids can be found by requesting all teams. NOTE: This endpoint will not return full team data. Only name, and player count by draft round",
    request: {
      params: RetrieveTeamParamsSchema,
      query: RetrievePlayersCountByDraftRoundQuerySchema
    },
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

const getPlayerCountByDraftRound = (players: Array<Player>): PlayerCountByDraftRound => players.reduce((playerCount: PlayerCountByDraftRound, player: Player) => {
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

    const { rounds, allTime } = c.req.query()

    const isAllTime = allTime?.toLowerCase() === 'true'

    const cursor = isAllTime ? MAX_CURSOR : DEFAULT_CURSOR

    const validRounds = rounds?.split(',')

    try {
      const cursorQueue: Array<number> = [cursor]

      let validPlayers: Players = []

      for (let cursor of cursorQueue) {

        const { data, meta }  = await ballDontLie(BALL_DONT_LIE_API_KEY, `${endpoint}&cursor=${cursor}`)

        const players = data as Array<Player>

        const playersInValidRounds = validRounds ? players.filter((player) => validRounds.includes(String(player.draft_round))) : players

        validPlayers = validPlayers.concat(playersInValidRounds)

        if (isAllTime && meta.next_cursor) {
          console.log({ isAllTime, nextCursor: meta.next_cursor })
          cursorQueue.push(meta.next_cursor)
        }

      }

      const playerCountByDraftRound: PlayerCountByDraftRound = getPlayerCountByDraftRound(validPlayers);

      const teamName: string = validPlayers[0].team.full_name

      const pickedPlayerCountByDraftRound: PlayerCountByDraftRound = validRounds
        ? pick(playerCountByDraftRound, validRounds)
        : playerCountByDraftRound

      const response: TeamNameAndPlayerCount = {
          team_name: teamName,
          draft_rounds: pickedPlayerCountByDraftRound
      }

      return c.json(
          response,
          200
      )
    } catch(error) {

      const message: string = `Error retrieving players with teamId ${teamId}.\nConfirm the teamId uses is valid and try again`;

      const cause: string = (error as Error).message;

      throw new HTTPException(500, { message, cause })

    }
  }
)

export default playerCountByDraftRound