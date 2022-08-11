import React from "react";
import {AddMember} from "../AddMember";
import {SportTable} from "../SportTable";
import {Results} from "../Results";
import s from './Competition.module.css'

const Competition = () => {
    return (
        <div className={s.competition}>
            <AddMember/>
            <div className={s.main_content}>
                <SportTable/>
                <Results/>
            </div>
        </div>
    )
}

export default Competition
