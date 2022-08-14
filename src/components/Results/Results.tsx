import React from "react";
import s from './Results.module.css'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {Matches} from "../../redux/teamReducer";
import {Match} from "../Match";
import {getMatches} from "../../redux/selectors";
import {updateMatchAction, updateMatchScoresAction} from "../../redux/actions";

export interface SaveResultPayload {
    goals_right_super: string | null,
    goals_left_super: string | null,
    right_super: string,
    left_super: string
}

const Results = () => {
    const matches = useSelector<RootState, Matches[]>(getMatches)
    const dispatch = useDispatch()

    const onSaveResult = (matchId: string, results: SaveResultPayload, wasPlayed: boolean) => {
        dispatch(wasPlayed ? updateMatchScoresAction(matchId, results) : updateMatchAction(matchId, results))
    }

    return (
        <div className={s.results_container}>
            {matches.map(match => (
                <Match
                    goals_left_super={match.goals_left_super}
                    goals_right_super={match.goals_right_super}
                    left_super={match.left_super}
                    right_super={match.right_super}
                    handleSaveResult={(results) =>
                        onSaveResult(match.id, results, match.goals_left_super !== null)
                    }
                />
            ))}
        </div>
    )
}

export default Results;
