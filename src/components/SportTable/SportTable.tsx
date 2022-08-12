import React, {useMemo} from "react";
import s from './SportTable.module.css'
import {headers} from "../../redux/mock";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {TeamReducerType} from "../../redux/teamReducer";

const SportTable = () => {
    const {teams} = useSelector<RootState, TeamReducerType>((state: RootState)=> state.team)
    const sportTeams = useMemo(() => Object.values(teams).sort((a, b) => {
        return +b[6].value - +a[6].value
    }), [teams])

    return (
        <div className={s.sport_table_container}>
            <table>
                <tr className={s.head_container}>
                    {headers.map(header => {
                        return (
                            <th className={s.header_cell}>{header}</th>
                        )
                    })}
                </tr>
                {sportTeams.map((data, index) => {
                    return (
                        <tr className={s.cell_container}>
                            {data.map((el) => {
                                if (el.column === "Place") {
                                    return (
                                        <td className={s.header_cell}>{index + 1}</td>
                                    )
                                }
                                return (
                                    <td className={s.header_cell}>{el.value}</td>
                                )
                            })}
                        </tr>
                    )
                })}
            </table>
        </div>
    )
}

export default SportTable
