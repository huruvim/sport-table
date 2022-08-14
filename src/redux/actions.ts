import {SaveResultPayload} from "../components/Results/Results";

export const addTeamAction = (teamName: string) => ({
    type: 'teamReducer/addTeam',
    payload: teamName
} as const)

export const createMatchAction = (teamName: string) => ({
    type: 'teamReducer/createMatch',
    payload: teamName
} as const)

export const updateMatchAction = (id: string, results: SaveResultPayload) => ({
    type: 'teamReducer/updateMatch',
    payload: {id, results}
} as const)

export const updateMatchScoresAction = (id: string, results: SaveResultPayload) => ({
    type: 'teamReducer/updateMatchScores',
    payload: {id, results}
} as const)

type UpdateMatchScoresAction = ReturnType<typeof updateMatchScoresAction>
type UpdateMatchAction = ReturnType<typeof updateMatchAction>
type CreateMatchAction = ReturnType<typeof createMatchAction>
type AddTeamAction = ReturnType<typeof addTeamAction>

export type ActionTypes = UpdateMatchScoresAction | UpdateMatchAction | CreateMatchAction | AddTeamAction
