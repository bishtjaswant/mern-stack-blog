import "./Register.css";

import LoginImg from '../../assets/images/login.jpg';
import { Link } from "react-router-dom";
import { useState } from "react";
import { useHistory } from 'react-router-dom';



const Register = () => {

    const [data, setData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState(false);
    const history= useHistory()

    const onSubmitHandler = async (e) => {
        try {

            const resp = await fetch(`/auth/register`, {
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

            (response_data.status===true) &&    history.push("/login");

        } catch (error) {
            setError(true);
            console.log(error)
        }


        setData({
            username: "",
            email: "",
            password: "",
        });


    }








    const onChangeFormHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }



    return (
        <div className='register'>

            <div className="register_wrapper container">


                <Link to='/login'>
                    <button className="btn login_btn">  Login     </button>
                </Link>

                <div className="title">
                    <h1>register yourself</h1>
                </div>


                <div className="group">
                    <label htmlFor="">Username</label>
                    <input required type="text" name="username" id="username" className="username control" placeholder="Username" onChange={onChangeFormHandler} />
                </div>

                <div className="group">
                    <label htmlFor="">email</label>
                    <input required type="text" name="email" id="email" className="email control" placeholder="enter email address" onChange={onChangeFormHandler} />
                </div>

                <div className="group">
                    <label required htmlFor="">password</label>
                    <input type="text" name="password" id="password" className="password control" placeholder="*******************" onChange={onChangeFormHandler} />
                </div>

                <button type="button" onClick={onSubmitHandler} style={{ width: "35%" }} className="btn">Register</button>


          {error && <span style={{color:"#f20707"}}>something went  wrong </span>}

            </div>

        </div>
    );
};

export default Register;