import React, { useState } from 'react'
import { Link,useNavigate} from "react-router-dom"
import { toast } from "react-toastify";
import { url } from "../App";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import {loginRedux} from '../redux/userSlice'


const Login = () => {

    const [passShow, setPassShow] = useState(false);

    const [inpval, setInpval] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();
    const userData=useSelector(state=>state)
    console.log(userData.user)

    const dispatch=useDispatch()

    const setVal = (e) => {
        // console.log(e.target.value);
        const { name, value } = e.target;

        setInpval(() => {
            return {
                ...inpval,
                [name]: value
            }
        })
    };


    const loginuser = async(e) => {
        e.preventDefault();

        const { email, password } = inpval;

        if (email === "") {
            toast.error("email is required!", {
                position: "top-center"
            });
        } else if (!email.includes("@")) {
            toast.warning("includes @ in your email!", {
                position: "top-center"
            });
        } else if (password === "") {
            toast.error("password is required!", {
                position: "top-center"
            });
        } else if (password.length < 6) {
            toast.error("password must be 6 char!", {
                position: "top-center"
            });
        } else {
            // console.log("user login succesfully done");
            try {
                let res = await axios.post(`${url}/login`,{email,password})
            if(res.status===200){
                sessionStorage.setItem('token',res.data.token)
                
                
                dispatch(loginRedux(res.data))
                toast.success(userData.user.name+res.data.message)
                console.log(userData.user.name)
                navigate('/')
            }
            } catch (error) {
                toast.error(error.response.data.message)
            }

            
            // const data = await fetch("/login",{
            //     method:"POST",
            //     headers:{
            //         "Content-Type":"application/json"
            //     },
            //     body:JSON.stringify({
            //          email, password
            //     })
            // });

            // const res = await data.json();
            //  console.log(res);

            // if(res.status === 201){
            //     localStorage.setItem("usersdatatoken",res.result.token);
            //     history("/dash")
            //     setInpval({...inpval,email:"",password:""});
            // }
        }
    }

    return (
        <>
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Welcome Back, Log In</h1>
                        <p>Hi, we are you glad you are back. Please login.</p>
                    </div>

                    <form>
                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <input type="email" value={inpval.email} onChange={setVal} name="email" id="email" placeholder='Enter Your Email Address' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="password">Password</label>
                            <div className="two">
                                <input type={!passShow ? "password" : "text"} onChange={setVal} value={inpval.password} name="password" id="password" placeholder='Enter Your password' />
                                <div className="showpass" onClick={() => setPassShow(!passShow)}>
                                    {!passShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>

                        <button className='btn' onClick={loginuser}>Login</button>
                        <p>Don't have an Account? <Link to="/signup">SignUp</Link> </p>
                    </form>
                    
                </div>
            </section>
        </>
    )
}

export default Login