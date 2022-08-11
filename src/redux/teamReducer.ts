import {v4} from "uuid";

const INITIAL_STATE: TeamReducerType = {
    teams: [],
    matches: []
};

export const teamReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case 'teamReducer/addTeam':
            const newTeam: Column[] = [
                {
                    column: 'Place',
                    value: '',
                    id: v4(),
                },
                {
                    column: 'Team',
                    value: action.payload as string,
                    id: v4(),
                },
                {
                    column: 'Played',
                    value: '0',
                    id: v4(),
                },
                {
                    column: 'Win',
                    value: '0',
                    id: v4(),
                },
                {
                    column: 'Draw',
                    value: '0',
                    id: v4(),
                },
                {
                    column: 'Lost',
                    value: '0',
                    id: v4(),
                },
                {
                    column: 'Points',
                    value: '0',
                    id: v4(),
                },
            ]
            return {
                ...state,
                teams: [...state.teams, newTeam]
            };
        case 'teamReducer/createMatche':
            const newTeamName = action.payload;
            if (state.teams.length > 1) {
                const matches = state.teams.reduce((acc: Matches[], val): Matches[] => {
                    const superName = val.find(col => col.column === "Team")?.value
                    if (!!superName && superName !== newTeamName) {
                        return [...acc, {
                            left_super: newTeamName,
                            right_super: superName,
                            goals_left_super: null,
                            goals_right_super: null,
                            result: null,
                            id: v4()
                        }]
                    }
                    return acc
                }, []);

                return {
                    ...state,
                    matches: [...state.matches, ...matches]
                };
            }
            return {
                ...state,
                matches: []
            };
        case 'teamReducer/updateMatch':
            const id = action.payload.id;
            const results = action.payload.results;
            debugger;
            return {
                ...state,

            }
        default:
            return state;

    }

};

export type TeamReducerType = {
    teams: Column[][],
    matches: Matches[]
}

export type Column = {
    column: string;
    value: string;
    id: string;
};

export type Matches = {
    left_super: string;
    right_super: string;
    goals_left_super: string | null;
    goals_right_super: string | null;
    result: string | null;
    id: string;
}
