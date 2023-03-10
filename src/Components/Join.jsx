import React, { useState } from 'react'
import './login.css'
import { app } from '../firebase'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

const Join = ({history}) => {
    const auth = getAuth(app);

    const [form, setForm] = useState({
        email: 'user10@email.com',
        password: '12341234'
    });

    const {email, password} = form;

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if(!window.confirm('가입하시겠습니까')) return;

        createUserWithEmailAndPassword(auth, email, password)
        .then((success)=>{
            alert('회원가입 성공');
            history.push('/login');
        })
        .catch((error)=>{
            alert('회원가입 실패'+error.message);
        });
    };

    return (
        <div>
            <h1>Join</h1>
            <form className='login' onSubmit={onSubmit}>
                <input name='email' placeholder='ID' value={email} onChange={onChange} />
                <input name='password' type='password' placeholder='PassWord' value={password} onChange={onChange} />
                <button className='button'>회원가입</button>
            </form>
        </div>
    )
}

export default Join