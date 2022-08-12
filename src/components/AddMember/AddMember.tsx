import React, {useState} from "react";
import s from './AddMember.module.css'
import {useDispatch} from "react-redux";

const AddMember = () => {
    const [value, setValue] = useState('');
    const dispatch = useDispatch();
    const addTeam = () => {
        dispatch({ type: 'teamReducer/addTeam', payload: value })
        dispatch({ type: 'teamReducer/createMatch', payload: value })
        setValue('');
    }

    const onEnterClick = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' && value.length > 0) {
            addTeam();
        }
    }


    return (
        <div className={s.add_member_container}>
            <div className={s.add_member} onKeyDown={onEnterClick}>
                <input type="text" placeholder="New team" value={value} onChange={e => setValue(e.target.value)}/>
                <button disabled={value.length === 0} onClick={addTeam}>Add</button>
            </div>
        </div>
    )
}

export default AddMember;
