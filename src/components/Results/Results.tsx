import React from "react";
import s from './Results.module.css'
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {TeamReducerType} from "../../redux/teamReducer";

const Results = () => {
    const {teams} = useSelector<RootState, TeamReducerType>((state: RootState)=> state.team)
    console.log(teams)
    return (
        <div className={s.results_container}>
            {teams.length > 1 && (
                <div></div>
            )}
        </div>
    )
}

export default Results;
