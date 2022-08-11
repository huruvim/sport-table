import React, {FC, useState} from "react";
import s from "../Results/Results.module.css";
import pencil from "../../assets/icons/pencil.svg";

interface MatchProps {
    left_super: string;
    right_super: string;
    goals_left_super: string | null;
    goals_right_super: string | null;
    handleSaveResult: ({
       goals_right_super,
       goals_left_super,
       right_super,
       left_super
    }: { goals_right_super: string | null, goals_left_super: string | null, right_super: string, left_super: string }) => void;
}

const Match: FC<MatchProps> = ({goals_right_super, goals_left_super, right_super, left_super, handleSaveResult}) => {
    const [leftResult, setLeftResult] = useState('')
    const [rightResult, setRightResult] = useState('')
    const [editMenu, setEditMenu] = useState(false)
    const onSave = () => {
        handleSaveResult({
            goals_right_super: leftResult,
            goals_left_super: rightResult,
            right_super,
            left_super
        })
    }

    return (
        <div className={s.single_match_container}>
            <div onBlur={onSave} className={s.single_match}>
                <span>{left_super}</span>
                <div>
                    {goals_left_super ? <span>{goals_left_super}</span> :
                        <input className={s.result_input} onChange={e => setLeftResult(e.target.value)} value={leftResult}/>}
                    {":"}
                    {goals_right_super ? <span>{goals_right_super}</span> :
                        <input className={s.result_input} onChange={e => setRightResult(e.target.value)} value={rightResult}/>}
                </div>
                <span>{right_super}</span>
            </div>
            <div className={s.match_manu}>
                <div style={{height: '24px', width: '24px'}}>
                    <img src={pencil} alt="pencil"/>
                </div>
            </div>
        </div>
    )
}

export default Match;
