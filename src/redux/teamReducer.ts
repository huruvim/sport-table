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
        case 'teamReducer/createMatches':
            const newTeamName = action.payload;
            if (state.teams.length > 1) {
                state.teams.map(el => el.map(ell => ell.value))
            }
            return {
                ...state,
                matches: []
            };
        default:
            return state;

    }

};

export type TeamReducerType = {
    teams: Column[][],
    matches: []
}

export type Column = {
    column: string;
    value: string;
    id: string;
};
