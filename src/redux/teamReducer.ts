import {v4} from "uuid";

const INITIAL_STATE: TeamReducerType = {
    teams: {},
    matches: []
};

export const teamReducer = (state = INITIAL_STATE, action: any): TeamReducerType => {
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
                teams: {...state.teams, [action.payload]: newTeam}
            };
        case 'teamReducer/createMatch':
            const newTeamName = action.payload;
            if (Object.keys(state.teams).length > 1) {
                const matches = Object.values(state.teams).reduce((acc: Matches[], val): Matches[] => {
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
        case 'teamReducer/updateMatch': {
            const first = action.payload.results.left_super
            const second = action.payload.results.right_super
            const mutateCells = (column: Column, currentResult: number) => {
                switch (column.column) {
                    case "Played":
                        return {...column, value: String(+column.value + 1)};
                    case "Win":
                        return currentResult > 0 ? {...column, value: String(+column.value + 1)} : column
                    case "Draw":
                        return currentResult === 0 ? {...column, value: String(+column.value + 1)} : column
                    case "Lost":
                        return currentResult < 0 ? {...column, value: String(+column.value + 1)} : column
                    case "Points":
                        const points = currentResult > 0 ? 3 : currentResult === 0 ? 1 : 0;
                        return currentResult >= 0 ? {...column, value: String(+column.value + points)} : column
                    default:
                        return column
                }
            }
            return {
                ...state,
                matches: state.matches.map(match =>
                    match.id === action.payload.id
                        ? {...match, ...action.payload.results}
                        : match
                ),
                teams: {
                    ...state.teams,
                    [first]: state.teams[first]
                        .map((col) => {
                            const currentResult = +action.payload.results.goals_left_super - +action.payload.results.goals_right_super
                            return mutateCells(col, currentResult)
                        }),
                    [second]: state.teams[second]
                        .map((col) => {
                            const currentResult = +action.payload.results.goals_right_super - +action.payload.results.goals_left_super
                            return mutateCells(col, currentResult)
                        }),
                }
            }
        }

        case 'teamReducer/updateMatchScores': {
            const first = action.payload.results.left_super
            const second = action.payload.results.right_super
            const previousMatchScores = state.matches.find(match => match.id === action.payload.id)
            let prevResult = 0;
            const isWin = (point: number) => point > 0;
            const isLost = (point: number) => point < 0;
            const isDraw = (point: number) => point === 0;
            const mutateCells = (column: Column, prevResult: number, currentResult: number) => {
                switch (column.column) {
                    case "Win":
                        if (isWin(prevResult) && isLost(currentResult)) {
                            return {...column, value: String(+column.value - 1)}
                        }
                        if (isWin(prevResult) && isDraw(currentResult)) {
                            return {...column, value: String(+column.value - 1)}
                        }
                        if (isDraw(prevResult) && isWin(currentResult)) {
                            return {...column, value: String(+column.value + 1)}
                        }
                        if (isLost(prevResult) && isWin(currentResult)) {
                            return {...column, value: String(+column.value + 1)}
                        }
                        return column
                    case "Draw":
                        if (isWin(prevResult) && isDraw(currentResult)) {
                            return {...column, value: String(+column.value + 1)}
                        }
                        if (isDraw(prevResult) && isWin(currentResult)) {
                            return {...column, value: String(+column.value - 1)}
                        }
                        if (isDraw(prevResult) && isLost(currentResult)) {
                            return {...column, value: String(+column.value - 1)}
                        }
                        if (isLost(prevResult) && isDraw(currentResult)) {
                            return {...column, value: String(+column.value + 1)}
                        }
                        return column
                    case "Lost":
                        if (isWin(prevResult) && isLost(currentResult)) {
                            return {...column, value: String(+column.value + 1)}
                        }
                        if (isDraw(prevResult) && isLost(currentResult)) {
                            return {...column, value: String(+column.value + 1)}
                        }
                        if (isLost(prevResult) && isWin(currentResult)) {
                            return {...column, value: String(+column.value - 1)}
                        }
                        if (isLost(prevResult) && isDraw(currentResult)) {
                            return {...column, value: String(+column.value - 1)}
                        }
                        return column
                    case "Points":
                        if (isWin(prevResult) && isLost(currentResult)) {
                            return {...column, value: String(+column.value - 3)}
                        }
                        if (isWin(prevResult) && isDraw(currentResult)) {
                            return {...column, value: String(+column.value -2)}
                        }
                        if (isDraw(prevResult) && isWin(currentResult)) {
                            return {...column, value: String(+column.value + 2)}
                        }
                        if (isDraw(prevResult) && isLost(currentResult)) {
                            return {...column, value: String(+column.value - 1)}
                        }
                        if (isLost(prevResult) && isWin(currentResult)) {
                            return {...column, value: String(+column.value + 3)}
                        }
                        if (isLost(prevResult) && isDraw(currentResult)) {
                            return {...column, value: String(+column.value + 1)}
                        }
                        return column
                    default:
                        return column
                }
            }
            return {
                ...state,
                matches: state.matches.map(match => match.id === action.payload.id ? {...match, ...action.payload.results} : match),
                teams: {
                    ...state.teams,
                    [first]: state.teams[first]
                        .map((col) => {
                            if (previousMatchScores?.goals_left_super && previousMatchScores?.goals_right_super) {
                                prevResult = +previousMatchScores.goals_left_super - +previousMatchScores.goals_right_super
                            }
                            const currentResult = +action.payload.results.goals_left_super - +action.payload.results.goals_right_super
                            return mutateCells(col, prevResult, currentResult)
                        }),
                    [second]: state.teams[second]
                        .map((col) => {
                            if (previousMatchScores?.goals_left_super && previousMatchScores?.goals_right_super) {
                                prevResult = +previousMatchScores.goals_right_super - +previousMatchScores.goals_left_super
                            }
                            const currentResult = +action.payload.results.goals_right_super - +action.payload.results.goals_left_super
                            return prevResult === currentResult ? col : mutateCells(col, prevResult, currentResult)
                        }),
                }
            }
        }
        default:
            return state;

    }

};

export type TeamReducerType = {
    teams: TeamType,
    matches: Matches[]
}

export type TeamType = {
    [teamName: string]: Column[]
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
