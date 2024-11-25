import { z } from '@hono/zod-openapi'
import {
    TeamSchema,
    TeamNameAndPlayerCountSchema,
    TeamsSchema
} from './schemas/team'
import {
    PlayerSchema,
    PlayersSchema
} from './schemas/player'
import { BallDontLieResponse } from './lib/ballDontLie/types'

export type Team = z.infer<typeof TeamSchema>
export type Teams = z.infer<typeof TeamsSchema>
export type TeamNameAndPlayerCount = z.infer<typeof TeamNameAndPlayerCountSchema>
export type PlayerCountByDraftRound = Record<string, number> // Refer to note on PlayerCountByDraftRoundSchema
export type Player = z.infer<typeof PlayerSchema>
export type Players = z.infer<typeof PlayersSchema>
export interface PlayersResponse extends Omit<BallDontLieResponse, 'data'> {
    data: Players
}