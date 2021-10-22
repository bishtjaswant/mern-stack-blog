import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LOGOUT } from '../../context/type';
import { ContextApi } from './../../context/context';
import { useHistory  } from 'react-router-dom';

import './Topbar.css';;

const Topbar = () => {

    const {user, dispatch} = useContext(ContextApi);
    const history = useHistory();

    const logoutHandler = ( ) => {
        dispatch({type:LOGOUT});
        history.push("/login");;

    }

    return (
        <div className='top'>
            <div className="topLeft">
                <i className="topSocialIcon fab fa-facebook-square"></i>
                <i className="topSocialIcon fab fa-twitter-square"></i>
                <i className="topSocialIcon fab fa-instagram-square"></i>
                <i className="topSocialIcon fab fa-youtube-square"></i>
                <i className="topSocialIcon fab fa-github-square"></i>
            </div>
            <div className="topCenter">
                <ul className="navbar">
                    <li className='item'><Link to="/">Home</Link></li>
                    <li className='item'><Link to="/about">About</Link></li>
                    <li className='item'><Link to="/contact">Contact</Link></li>
                 {user &&   <li className='item'><Link to="/write">Write</Link></li>}
                    {user && <li className='item'><Link to="/" onClick={logoutHandler}> Logout   </Link></li>}
                </ul>
            </div>
            <div className="topRight">

                {
                    user?(

                    
                        <img className='profile' src={user.profilePic}  alt="profile pic" />
                    ):(
                        <div className="topCenter">
                        <ul className="navbar">
                            <li className='item'><Link to="/login">Login</Link></li>
                            <li className='item'><Link to="/register">Register</Link></li>
                        </ul>
                        </div>
                    )
                }
                <i className="fas topSearchIcon fa-search"></i>

            </div>
        </div>
    ); 
};

export default Topbar;