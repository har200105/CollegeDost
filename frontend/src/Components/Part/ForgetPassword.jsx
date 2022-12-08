import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Signup.css";
import "./Login.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { LoginContext } from "../../ContextProvider/ContextProvider";
import { AccountContext } from "../../ContextProvider/AccountProvider";
import "react-circular-progressbar/dist/styles.css";
import { Helmet } from "react-helmet";
import ChangingProgressProvider from "./ChangingProgress";
import "bootstrap/dist/css/bootstrap.min.css";
import { API } from "./API";



const ForgotPassword = (props) => {
    const { account, setAccount, showloginButton, setShowloginButton, showlogoutButton, setShowlogoutButton } = useContext(AccountContext);
    const [isActive, setActive] = useState("false");
    const [message, setMessage] = useState("");
    const [email, setEmail] = useState("");
    const history = useHistory();
    const handleToggle = () => {
        setActive(!isActive);
    };


    const sendLink = async (e) => {
        e.preventDefault();
        if (!email) {
            setMessage("Please add a Valid Email");
        }
        const pass = await axios.post(`${API}/forgotPassword`, {
            email
        });
        console.log(pass.data);
        if (pass.data.success) {
            setEmail("");
            setMessage("You have been sent an verification link to change your password,Please do check in your spam folder too");
        } else if (!pass.data.success) {
            setEmail("");
            setMessage("Any User With This Email Address Doesnot Exist")
        }
    }

    return (
        <div className="login signup">
            <Helmet>
                <title>Forgot Password</title>
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
                                    <h3>Forgot Password</h3>
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <p
                        style={{
                            color: "red",
                        }}
                    >
                        {message}
                    </p>
                    <button id="submit" onClick={sendLink}>
                       Submit
                    </button>
                </form>
            </div>
        </div>
    );
};
export default ForgotPassword;
