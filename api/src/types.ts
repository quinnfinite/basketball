import { z } from '@hono/zod-openapi'
import { TeamSchema } from './schemas/team'
import { PlayerSchema } from './schemas/player'

interface DynamicObject {
  [key: string]: number
}

export type Team = z.infer<typeof TeamSchema>
export type Player = z.infer<typeof PlayerSchema>

export interface PlayerCountByRound extends DynamicObject