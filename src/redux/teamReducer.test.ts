import {initState, teamReducer, TeamReducerType} from "./teamReducer";
import {addTeamAction, createMatchAction, updateMatchAction, updateMatchScoresAction} from "./actions";

describe("teamReducer:", () => {
    describe("addTeamAction:", () => {
        it("Should add a team", () => {
            const action = addTeamAction("testTeamName")
            const result = teamReducer(initState, action)
            expect(result.teams.testTeamName[1].value).toBe("testTeamName")
            expect(result.teams.testTeamName[2].value).toBe("0")
            expect(result.teams.testTeamName[3].value).toBe("0")
            expect(result.teams.testTeamName[4].value).toBe("0")
            expect(result.teams.testTeamName[5].value).toBe("0")
            expect(result.teams.testTeamName[6].value).toBe("0")
        })
    })
    describe("createMatchAction:", () => {
        it('Should not create a match due to the fact only one team exist', () => {
            const action = createMatchAction("testTeamName")
            const result = teamReducer(initState, action)
            expect(result.matches).toStrictEqual([])
        })
        it('Should create a match', () => {
            const tempResult = teamReducer(initState, addTeamAction("testTeamName"))
            const tempResult2 = teamReducer(tempResult, addTeamAction("testTeamName2"))
            const action = createMatchAction("testTeamName2")
            const result = teamReducer(tempResult2, action)
            expect(result.matches[0].goals_left_super).toBe(null)
            expect(result.matches[0].goals_right_super).toBe(null)
            expect(result.matches[0].left_super).toBe('testTeamName2')
            expect(result.matches[0].right_super).toBe('testTeamName')
        })
    })
    describe("updateMatchAction:", () => {
        const left_super = "testTeamNameItaly";
        const right_super = "testTeamNameGermany";
        let stateWithTeams: TeamReducerType;
        beforeAll(() => {
            const tempResult = teamReducer(initState, addTeamAction(right_super))
            const tempResult2 = teamReducer(tempResult, addTeamAction(left_super))
            stateWithTeams = teamReducer(tempResult2, createMatchAction(left_super))
        })
        it("Should update match result as Italy won", () => {
            const matchAction = updateMatchAction(stateWithTeams.matches[0].id,{
                left_super,
                right_super,
                goals_left_super: '3',
                goals_right_super: '1'
            })
            const matchResult = teamReducer(stateWithTeams, matchAction)
            expect(matchResult.matches[0].goals_left_super).toBe("3")
            expect(matchResult.matches[0].goals_right_super).toBe("1")

            expect(matchResult.teams.testTeamNameItaly[2].value).toBe("1")
            expect(matchResult.teams.testTeamNameItaly[3].value).toBe("1")
            expect(matchResult.teams.testTeamNameItaly[4].value).toBe("0")
            expect(matchResult.teams.testTeamNameItaly[5].value).toBe("0")
            expect(matchResult.teams.testTeamNameItaly[6].value).toBe("3")

            expect(matchResult.teams.testTeamNameGermany[2].value).toBe("1")
            expect(matchResult.teams.testTeamNameGermany[3].value).toBe("0")
            expect(matchResult.teams.testTeamNameGermany[4].value).toBe("0")
            expect(matchResult.teams.testTeamNameGermany[5].value).toBe("1")
            expect(matchResult.teams.testTeamNameGermany[6].value).toBe("0")
        })
        it("Should update match result as Germany won", () => {
            const matchAction = updateMatchAction(stateWithTeams.matches[0].id,{
                left_super,
                right_super,
                goals_left_super: '1',
                goals_right_super: '3'
            })
            const matchResult = teamReducer(stateWithTeams, matchAction)
            expect(matchResult.matches[0].goals_left_super).toBe("1")
            expect(matchResult.matches[0].goals_right_super).toBe("3")

            expect(matchResult.teams.testTeamNameItaly[2].value).toBe("1")
            expect(matchResult.teams.testTeamNameItaly[3].value).toBe("0")
            expect(matchResult.teams.testTeamNameItaly[4].value).toBe("0")
            expect(matchResult.teams.testTeamNameItaly[5].value).toBe("1")
            expect(matchResult.teams.testTeamNameItaly[6].value).toBe("0")

            expect(matchResult.teams.testTeamNameGermany[2].value).toBe("1")
            expect(matchResult.teams.testTeamNameGermany[3].value).toBe("1")
            expect(matchResult.teams.testTeamNameGermany[4].value).toBe("0")
            expect(matchResult.teams.testTeamNameGermany[5].value).toBe("0")
            expect(matchResult.teams.testTeamNameGermany[6].value).toBe("3")
        })
        it("Should update match result as Draw", () => {
            const matchAction = updateMatchAction(stateWithTeams.matches[0].id,{
                left_super,
                right_super,
                goals_left_super: '2',
                goals_right_super: '2'
            })
            const matchResult = teamReducer(stateWithTeams, matchAction)
            expect(matchResult.matches[0].goals_left_super).toBe("2")
            expect(matchResult.matches[0].goals_right_super).toBe("2")

            expect(matchResult.teams.testTeamNameItaly[2].value).toBe("1")
            expect(matchResult.teams.testTeamNameItaly[3].value).toBe("0")
            expect(matchResult.teams.testTeamNameItaly[4].value).toBe("1")
            expect(matchResult.teams.testTeamNameItaly[5].value).toBe("0")
            expect(matchResult.teams.testTeamNameItaly[6].value).toBe("1")

            expect(matchResult.teams.testTeamNameGermany[2].value).toBe("1")
            expect(matchResult.teams.testTeamNameGermany[3].value).toBe("0")
            expect(matchResult.teams.testTeamNameGermany[4].value).toBe("1")
            expect(matchResult.teams.testTeamNameGermany[5].value).toBe("0")
            expect(matchResult.teams.testTeamNameGermany[6].value).toBe("1")
        })
    })
    describe("updateMatchScoresAction:", () => {
        const left_super = "testTeamNameItaly";
        const right_super = "testTeamNameGermany";
        let stateWithTeams: TeamReducerType;
        beforeAll(() => {
            const tempResult = teamReducer(initState, addTeamAction(right_super))
            const tempResult2 = teamReducer(tempResult, addTeamAction(left_super))
            const tempResult3 = teamReducer(tempResult2, createMatchAction(left_super))
            const matchAction = updateMatchAction(tempResult3.matches[0].id,{
                left_super,
                right_super,
                goals_left_super: '2',
                goals_right_super: '2'
            })
            stateWithTeams = teamReducer(tempResult3, matchAction)
        })
        it("Should update match result as Italy won from draw", () => {
            const matchAction = updateMatchScoresAction(stateWithTeams.matches[0].id, {
                left_super,
                right_super,
                goals_left_super: '4',
                goals_right_super: '1'
            })
            const matchResult = teamReducer(stateWithTeams, matchAction)
            expect(matchResult.matches[0].goals_left_super).toBe("4")
            expect(matchResult.matches[0].goals_right_super).toBe("1")

            expect(matchResult.teams.testTeamNameItaly[2].value).toBe("1")
            expect(matchResult.teams.testTeamNameItaly[3].value).toBe("1")
            expect(matchResult.teams.testTeamNameItaly[4].value).toBe("0")
            expect(matchResult.teams.testTeamNameItaly[5].value).toBe("0")
            expect(matchResult.teams.testTeamNameItaly[6].value).toBe("3")

            expect(matchResult.teams.testTeamNameGermany[2].value).toBe("1")
            expect(matchResult.teams.testTeamNameGermany[3].value).toBe("0")
            expect(matchResult.teams.testTeamNameGermany[4].value).toBe("0")
            expect(matchResult.teams.testTeamNameGermany[5].value).toBe("1")
            expect(matchResult.teams.testTeamNameGermany[6].value).toBe("0")
        })
        it("Should update match result as Germany won from draw", () => {
            const matchAction = updateMatchScoresAction(stateWithTeams.matches[0].id, {
                left_super,
                right_super,
                goals_left_super: '1',
                goals_right_super: '4'
            })
            const matchResult = teamReducer(stateWithTeams, matchAction)
            expect(matchResult.matches[0].goals_left_super).toBe("1")
            expect(matchResult.matches[0].goals_right_super).toBe("4")

            expect(matchResult.teams.testTeamNameItaly[2].value).toBe("1")
            expect(matchResult.teams.testTeamNameItaly[3].value).toBe("0")
            expect(matchResult.teams.testTeamNameItaly[4].value).toBe("0")
            expect(matchResult.teams.testTeamNameItaly[5].value).toBe("1")
            expect(matchResult.teams.testTeamNameItaly[6].value).toBe("0")

            expect(matchResult.teams.testTeamNameGermany[2].value).toBe("1")
            expect(matchResult.teams.testTeamNameGermany[3].value).toBe("1")
            expect(matchResult.teams.testTeamNameGermany[4].value).toBe("0")
            expect(matchResult.teams.testTeamNameGermany[5].value).toBe("0")
            expect(matchResult.teams.testTeamNameGermany[6].value).toBe("3")
        })
    })
})