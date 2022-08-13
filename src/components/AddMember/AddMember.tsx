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
        console.log(value.length)
        if (e.key === 'Enter' && value.length > 0 && value.length <= 64) {
            addTeam();
        }
    }

    return (
        <div className={s.add_member_container}>
            <div className={s.add_member} onKeyDown={onEnterClick}>
                {value.length > 64 && <div className={s.errorMessage}>team name is too long</div>}
                <input type="text" placeholder="New team" value={value} onChange={e => setValue(e.target.value)}/>
                <button disabled={value.length === 0 || value.length > 64} onClick={addTeam}>Add</button>
            </div>
        </div>
    )
}

export default AddMember;
