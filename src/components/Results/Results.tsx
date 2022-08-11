import React from "react";
import s from './Results.module.css'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {TeamReducerType} from "../../redux/teamReducer";
import {Match} from "../Match";

const Results = () => {
    const {matches} = useSelector<RootState, TeamReducerType>((state: RootState) => state.team)
    const dispatch = useDispatch()

    const onSaveResult = (matchId: string, results: any) => {
        dispatch({type: 'teamReducer/updateMatch', payload: {id: matchId, results}})
    }

    return (
        <div className={s.results_container}>
            {matches.map(match => (
                <Match
                    goals_left_super={match.goals_left_super}
                    goals_right_super={match.goals_right_super}
                    left_super={match.left_super}
                    right_super={match.right_super}
                    handleSaveResult={(results) => onSaveResult(match.id, results)}
                />
            ))}
        </div>
    )
}

export default Results;
