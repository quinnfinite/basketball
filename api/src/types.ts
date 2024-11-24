import { z } from '@hono/zod-openapi'
import { TeamSchema, TeamNameAndPlayerCountSchema } from './schemas/team'
import { PlayerSchema } from './schemas/player'

export type Team = z.infer<typeof TeamSchema>
export type Player = z.infer<typeof PlayerSchema>
export type TeamNameAndPlayerCount = z.infer<typeof TeamNameAndPlayerCountSchema>
export type PlayerCountByDraftRound = Record<string, number> // Refer to note on PlayerCountByDraftRoundSchema