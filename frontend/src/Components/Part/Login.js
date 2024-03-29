import React, { useContext, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Signup.css";
import "./Login.css";
import { useDispatch } from "react-redux";
import { AuthContext } from "../../ContextProvider/ContextProvider";
import "react-circular-progressbar/dist/styles.css";
import { Helmet } from "react-helmet";
import "bootstrap/dist/css/bootstrap.min.css";
import { API } from "./API";
import { useToast } from '@chakra-ui/react';
import { loadUser } from "../../actions/userAction";

const LoginValues = {
  email: "",
  password: "",
};

const Login = () => {
  const {dispatch} = useContext(AuthContext);
  const [isActive, setActive] = useState("false");
  const [login, setLogin] = useState(LoginValues);
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const dispatchFunction = useDispatch();

  const toast = useToast();


  const inputChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const LoginUser = async (e) => {
    e.preventDefault();
    dispatch({type:"LOGIN_START"});
    try{
      const url = `${API}/login`;
      const res = await axios.post(url, login);
      if (res.data.success) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.user });
        localStorage.setItem("jwt", res.data.token);
        localStorage.setItem("user",JSON.stringify(res.data.user));
        dispatchFunction(loadUser());
      
        toast({
          title: "Success",
          description: "Login Successfull",
          status: "success",
          isClosable:false
      });
        
      } else if (!res.data.success) {
         toast({
          title: "Failed",
          description: res?.data?.error,
          status: "error",
          isClosable:false
      });
      }
  }catch(e){
      dispatch({type:"LOGIN_FAILURE",payload:e});
  }
}

  return (
    <div className="login signup">
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className={isActive ? "light" : null}>
        <div className="wrapper-header">
          <header className="mt-2 text-center" style={{ color: "white" }}>
            College Dost
          </header>
        </div>
        <form className="form">
          <Link
            to="/"
            style={{
              textDecoration: "none",
            }}
          >
            <div className="btn-choice change1 change2">
              <button className="signup_btn">
                <span>
                  <h3>Login</h3>
                </span>
              </button>
            </div>
          </Link>
          <label htmlFor="email">Email:</label>
          <input
            id="username"
            type="text"
            name="email"
            autoComplete="off"
            placeholder="Enter email"
            onChange={(e) => inputChange(e)}
          />
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="enter password"
            autoComplete="off"
            onChange={(e) => inputChange(e)}
          />
          <p
            style={{
              color: "red",
            }}
          >
            {error}
          </p>
          {show ? (
            <button id="submit" disabled>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            </button>
          ) : (
            <button id="submit" onClick={(e) => LoginUser(e)}>
              Login
            </button>
          )}
          <Link
            to="/forgetPassword"
            style={{
              textDecoration: "none",
              color: "white",
            }}
          >
            Forgot Password ?
          </Link>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "white",
            }}
          >
            New to College Dost ? Signup
          </Link>
        </form>
      </div>
    </div>
  );
};
export default Login;
