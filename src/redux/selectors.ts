import {RootState} from "./store";

export const getTeams = (state: RootState) => state.team.teams
export const getMatches = (state: RootState) => state.team.matches