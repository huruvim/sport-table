import React, {useState} from "react";
import s from './AddMember.module.css'
import {useDispatch} from "react-redux";

const AddMember = () => {
    const [value, setValue] = useState('');
    const dispatch = useDispatch();
    const addTeam = () => {
        dispatch({ type: 'teamReducer/addTeam', payload: value })
        dispatch({ type: 'teamReducer/createMatche', payload: value })
        setValue('');
    }
    return (
        <div className={s.add_member_container}>
            <div className={s.add_member}>
                <input type="text" placeholder="New team" value={value} onChange={e => setValue(e.target.value)}/>
                <button disabled={value.length === 0} onClick={addTeam}>Add</button>
            </div>
        </div>
    )
}

export default AddMember;
