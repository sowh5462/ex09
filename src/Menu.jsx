import React from 'react'
import { NavLink, Route, Switch, withRouter } from 'react-router-dom'
import Favor from './Components/Favor'
import Home from './Components/Home'
import Join from './Components/Join'
import Local from './Components/Local'
import Login from './Components/Login'

const Menu = ({history}) => {
    const style = {
        color: 'salmon',
        fontWeight: 'bold'
    };

    let email = sessionStorage.getItem('email');

    const onLogout = (e) => {
        e.preventDefault();
        sessionStorage.removeItem('email');
        history.push('/')
    }

    return (
        <div>
            <div className='menu'>
                <NavLink to="/" activeStyle={style} exact={true}>Home</NavLink>
                <NavLink to="/local" activeStyle={style}>맛집검색</NavLink>
                <NavLink to="/favor" activeStyle={style}>즐겨찾기</NavLink>
                {email ? 
                    <NavLink to="#" onClick={onLogout} className='log' >로그아웃</NavLink>
                    :
                    <NavLink to="/login" className='log' >로그인</NavLink>
                }
                {email && <span>{email}</span>}
            </div>

            <Switch>
                <Route path="/" component={Home} exact={true} />
                <Route path="/local" component={Local} />
                <Route path="/favor" component={Favor} />
                <Route path="/login" component={Login} />
                <Route path="/join" component={Join} />
            </Switch>
        </div>
    )
}

export default withRouter(Menu)