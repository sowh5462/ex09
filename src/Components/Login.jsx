import React, { useState } from 'react'
import './login.css'
import { app } from '../firebase'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const Login = ({history}) => {
    const auth = getAuth(app);

    const [form, setForm] =useState({
        email : 'user01@email.com',
        password : '12341234'
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
        
        signInWithEmailAndPassword(auth, email, password)
        .then((success)=>{
            alert('로그인 성공');
            sessionStorage.setItem('email', email);
            history.go(-1);
        })
        .catch((error)=>{
            alert('로그인 실패'+error.message)
        });
    };


    return (
        <div>
            <h1>Login</h1>
            <form className='login' onSubmit={onSubmit}>
                <input name='email' placeholder='ID' value={email} onChange={onChange} />
                <input name='password' type='password' placeholder='PassWord' value={password} onChange={onChange} />
                <button className='button'>로그인</button>
                <button className='button' onClick={()=>history.push('/join')}>회원가입</button>
            </form>
        </div>
    )
}

export default Login