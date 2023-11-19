import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { url } from "../App";
import axios from "axios";

function SignUp() {
  const [passShow, setPassShow] = useState(false);
  const [cpassShow, setCPassShow] = useState(false);

  const [inpval, setInpval] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    role: "",
  });

  const setVal = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target;

    setInpval(() => {
      return {
        ...inpval,
        [name]: value,
      };
    });
  };

  const addUserdata = async (e) => {
    e.preventDefault();

    const { name, email, password, cpassword, role } = inpval;

    if (name === "") {
      toast.warning("fname is required!", {
        position: "top-center",
      });
    } else if (email === "") {
      toast.error("email is required!", {
        position: "top-center",
      });
    } else if (!email.includes("@")) {
      toast.warning("includes @ in your email!", {
        position: "top-center",
      });
    } else if (password === "") {
      toast.error("password is required!", {
        position: "top-center",
      });
    } else if (password.length < 6) {
      toast.error("password must be 6 char!", {
        position: "top-center",
      });
    } else if (cpassword === "") {
      toast.error("cpassword is required!", {
        position: "top-center",
      });
    } else if (cpassword.length < 6) {
      toast.error("confirm password must be 6 char!", {
        position: "top-center",
      });
    } else if (password !== cpassword) {
      toast.error("pass and Cpass are not matching!", {
        position: "top-center",
      });
    } else if (role === "") {
      toast.error("role is required", {
        position: "top-center",
      });
    } else {
      // console.log("user registration succesfully done");
      try {
        let res = await axios.post(`${url}/signup`, {
          name,
          email,
          password,
          cpassword,
          role,
        });
        console.log(res);
        if (res.status === 200) {
          // sessionStorage.setItem('token',res.data.token)
          toast.success(res.data.message);
          setInpval({
            ...inpval,
            fname: "",
            email: "",
            password: "",
            cpassword: "",
            role: "",
          });
          // navigate('/dashboard')
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }

      // const data = await fetch("/register", {
      //     method: "POST",
      //     headers: {
      //         "Content-Type": "application/json"
      //     },
      //     body: JSON.stringify({
      //         fname, email, password, cpassword
      //     })
      // });

      // const res = await data.json();
      // console.log(res.status);

      // if (res.status === 201) {
      //     toast.success("Registration Successfully done 😃!", {
      //         position: "top-center"
      //     });
      //     setInpval({ ...inpval, fname: "", email: "", password: "", cpassword: "" });
      // }
    }
  };

  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Sign Up</h1>
          </div>

          <form>
            <div className="form_input">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                onChange={setVal}
                value={inpval.name}
                name="name"
                id="name"
                placeholder="Enter Your Name"
              />
            </div>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                onChange={setVal}
                value={inpval.email}
                name="email"
                id="email"
                placeholder="Enter Your Email Address"
              />
            </div>
            <div className="form_input">
              <label htmlFor="password">Password</label>
              <div className="two">
                <input
                  type={!passShow ? "password" : "text"}
                  value={inpval.password}
                  onChange={setVal}
                  name="password"
                  id="password"
                  placeholder="Enter Your password"
                />
                <div
                  className="showpass"
                  onClick={() => setPassShow(!passShow)}
                >
                  {!passShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>

            <div className="form_input">
              <label htmlFor="password">Confirm Password</label>
              <div className="two">
                <input
                  type={!cpassShow ? "password" : "text"}
                  value={inpval.cpassword}
                  onChange={setVal}
                  name="cpassword"
                  id="cpassword"
                  placeholder="Confirm password"
                />
                <div
                  className="showpass"
                  onClick={() => setCPassShow(!cpassShow)}
                >
                  {!cpassShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>
            <label htmlFor="role">Role</label>
            <div class="input-group mb-3">
              {/* <label htmlFor="role">Role</label> */}
              {/* <label class="input-group-text" for="inputGroupSelect01">Role</label> */}
              <select
                class="form-select"
                id="inputGroupSelect01"
                onChange={setVal}
                value={inpval.role}
                name="role"
                placeholder="Enter Your Role"
              >
                <option selected></option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
            </div>

            {/* <div className="form_input">
                            <label htmlFor="role">Role</label>
                            
                            <input type="text" onChange={setVal} value={inpval.role} name="role" id="role" placeholder='Enter Your Role' />
                        </div> */}

            <button className="btn" onClick={addUserdata}>
              Sign Up
            </button>
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
}

export default SignUp;
