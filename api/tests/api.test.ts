import {
    env,
    createExecutionContext,
    waitOnExecutionContext,
} from "cloudflare:test";
import { describe, it, expect } from "vitest";
import { TeamSchema } from '../src/schemas/team'
import type {
  Team,
  Teams,
  TeamNameAndPlayerCount,
  Player,
  Players,
  PlayersResponse
} from "../src/types";
import worker from "../src";
import { PlayerSchema } from "../src/schemas/player";
  
  // Per Cloudflare vitest docs - For now, we'll need to do something like this to get a correctly-typed
  // `Request` to pass to `worker.fetch()`.
  const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;
  
  const BASE_URL = 'https://basketball-api.quinn-royston.workers.dev'

  const sortedTeamKey: Array<string> = TeamSchema.keyof().options.sort()
  const sortedPlayerKeys: Array<string> = PlayerSchema.keyof().options.sort()
  
  const isTeamShape = (team: Team) => JSON.stringify(Object.keys(team).sort()) === JSON.stringify(sortedTeamKey)
  const allTeamsMatchShape = (teams: Teams) => teams.every(isTeamShape)

  const isPlayerShape = (player: Player) => JSON.stringify(Object.keys(player).sort()) === JSON.stringify(sortedPlayerKeys)
  const allPlayersMatchShape = (players: Players) => players.every(isPlayerShape)

  describe("Basketball API", () => {
    it("Teams endpoint returns list of teams", async () => {
      const endpoint: string = `/teams`
      const request = new IncomingRequest(`${BASE_URL}${endpoint}`);

      const ctx = createExecutionContext();
      const response = await worker.fetch(request, env, ctx);

      await waitOnExecutionContext(ctx);
      const result: Teams = await response.json();

      expect(result).toHaveProperty('length') // Verifies that result is an array
      expect(result).toSatisfy(allTeamsMatchShape) // Verifies shape of each team object
    });

    it("Specific Team Endpoint returns correct team information", async () => {
      const goldenStateWarriorsTeamId: number = 10;

      const goldenStateWarriorsTeamInfo: Team = {
        "id": 10,
        "conference":"West",
        "division":"Pacific",
        "city":"Golden State",
        "name":"Warriors",
        "full_name":"Golden State Warriors",
        "abbreviation":"GSW"
      }

      const endpoint: string = `/teams/${goldenStateWarriorsTeamId}`
      const request = new IncomingRequest(`${BASE_URL}${endpoint}`);

      const ctx = createExecutionContext();
      const response = await worker.fetch(request, env, ctx);

      await waitOnExecutionContext(ctx);
      const result: Team = await response.json()

      expect(result).toEqual(goldenStateWarriorsTeamInfo);
    });
    
    it("Player Count By Draft Round endpoint returns correct team information", async () => {
      const goldenStateWarriorsTeamId: number = 10;

      const goldenStateWarriorsTeamInfo: TeamNameAndPlayerCount = {
        "team_name": "Golden State Warriors",
        "draft_rounds": {
          "1": 13,
          "2": 7,
          "null": 5
        }
      }

      const endpoint = `/teams/${goldenStateWarriorsTeamId}/playerCountByDraftRound`
      const request = new IncomingRequest(`${BASE_URL}${endpoint}`);

      const ctx = createExecutionContext();
      const response = await worker.fetch(request, env, ctx);

      await waitOnExecutionContext(ctx);
      const result: TeamNameAndPlayerCount = await response.json();

      expect(result).toStrictEqual(goldenStateWarriorsTeamInfo);
    });

    it("Players endpoint returns list of players", async () => {
      const endpoint: string = `/players`
      const request = new IncomingRequest(`${BASE_URL}${endpoint}`);

      const ctx = createExecutionContext();
      const response = await worker.fetch(request, env, ctx);

      await waitOnExecutionContext(ctx);
      const result: PlayersResponse = await response.json();

      expect(result.data).toHaveProperty('length') // Verifies that result is an array
      expect(result.data).toSatisfy(allPlayersMatchShape) // Verifies player shape
    });    

  });

  