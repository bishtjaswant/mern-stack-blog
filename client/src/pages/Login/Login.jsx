import './Login.css';
 import LoginImg from '../../assets/images/login.jpg';
import { Link } from 'react-router-dom';
import { useContext, useRef } from 'react';
import { ContextApi } from '../../context/context';
import { LOGIN_START, LOGIN_FAILURE, LOGIN_SUCCESS } from './../../context/type';
import {useHistory  } from 'react-router-dom';





const Login = () => {

    const emailRef = useRef();
    const passwordRef = useRef();
    const history=useHistory();;

    const {user,dispatch,isFetching}=   useContext(ContextApi)


    const onSubmitHandler = async ( e   ) => {

        dispatch({ type:LOGIN_START });
        
        try {
            const data={
                "email":emailRef.current.value,
                "password":passwordRef.current.value,
            }
            const resp = await fetch(`/auth/login`, {
                method: 'POST',
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache',
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify(data)
            });
            const response_data = await resp.json();

            dispatch({ type:LOGIN_SUCCESS, payload: response_data.data.user });

             history.push("/");

        } catch (error) {

        dispatch({ type:LOGIN_FAILURE });

            console.log(error)
        }


    }


    return (
        <div className='login'>
               <div className="login_wrapper container">
                   

                   <Link to='register'> 
                   <button className="btn register_btn">   register </button>
                   </Link>
                   <div className="title">
                       <h1>login credentials</h1>
                   
                   </div>
                   <div className="group">
                       <label htmlFor="">email</label>
                       <input type="text" name="email" id="email" className="email control" placeholder="enter email address" ref={emailRef} />
                   </div>

                   <div className="group">
                       <label htmlFor="">password</label>
                       <input type="text" name="password" id="password" className="password control" placeholder="*******************"  ref={passwordRef}  />
                   </div>
                    
                    <button type='button'  disabled={isFetching} onClick={onSubmitHandler} style={{width:"35%"}} className="btn login_button_disabled">login</button>

               </div>
        </div>
    );
};

export default Login;