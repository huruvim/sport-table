import React, {FC, useState} from "react";
import s from "../Results/Results.module.css";
import pencil from "../../assets/icons/pencil.svg";
import ok from "../../assets/icons/ok.svg";
import cancel from "../../assets/icons/cancel.svg";

interface MatchProps {
    left_super: string;
    right_super: string;
    goals_left_super: string | null;
    goals_right_super: string | null;
    handleSaveResult: (props: { goals_right_super: string | null, goals_left_super: string | null, right_super: string, left_super: string }) => void;
}

const isNumber = new RegExp('^[0-9]*$');

const Match: FC<MatchProps> = ({goals_right_super, goals_left_super, right_super, left_super, handleSaveResult}) => {
    const [leftResult, setLeftResult] = useState(goals_left_super || "")
    const [rightResult, setRightResult] = useState(goals_right_super || "")
    const [editMenu, setEditMenu] = useState(false)
    const hasNoResult = goals_right_super === null && goals_left_super === null

    const onSave = () => {
        if (leftResult.length > 0 && rightResult.length > 0) {
            handleSaveResult({
                goals_right_super: rightResult,
                goals_left_super: leftResult,
                right_super,
                left_super
            })
        }
        if (!hasNoResult) {
            handleMenu()
        }
    }

    const onCancel = () => {
        setLeftResult(goals_left_super || "")
        setRightResult(goals_right_super || "")
        handleMenu()
    }

    const onInputType = (value: string, isLeftOne: boolean) => {
        if (isNumber.test(value)) {
            isLeftOne ? setLeftResult(value) : setRightResult(value)
        }
    }
    const handleMenu = () => setEditMenu(prev => !prev)
    console.log("hasNoResult", hasNoResult)
    console.log("editMenu", editMenu)
    console.log("leftResult", leftResult)
    console.log("rightResult", rightResult)
    return (
        <div className={s.single_match_container}>
            <div className={s.single_match}>
                <span>{left_super}</span>
                <div>
                    {!hasNoResult || (!hasNoResult && !editMenu && leftResult && rightResult) ? (
                        <span>{leftResult}</span>
                    ) : (
                        <input className={s.result_input} onChange={e => onInputType(e.target.value, true)}
                               value={leftResult}/>
                    )}
                    <span>:</span>
                        {!hasNoResult || (!hasNoResult && !editMenu && leftResult && rightResult) ? (
                        <span>{rightResult}</span>
                    ) : (
                        <input className={s.result_input} onChange={e => onInputType(e.target.value, false)}
                               value={rightResult}/>
                    )}
                </div>
                <span>{right_super}</span>
            </div>
            <div className={s.match_manu}>
                {!hasNoResult && !editMenu && (
                    <div style={{height: '24px', width: '24px'}} onClick={handleMenu}>
                        <img src={pencil} alt="pencil"/>
                    </div>
                )}
                {editMenu && (
                    <div className={s.edit_menu}>
                        <div style={{height: '24px', width: '24px'}} onClick={onSave}>
                            <img src={ok} alt="ok"/>
                        </div>
                        <div style={{height: '24px', width: '24px'}} onClick={onCancel}>
                            <img src={cancel} alt="ok"/>
                        </div>
                    </div>
                )}
                {hasNoResult && (
                    <div className={s.edit_menu}>
                        <div style={{height: '24px', width: '24px'}} onClick={onSave}>
                            <img src={ok} alt="ok"/>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Match;
