import React, { useContext, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Signup.css";
import "./Login.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { LoginContext } from "../../ContextProvider/ContextProvider";
import { AccountContext } from "../../ContextProvider/AccountProvider";
import "react-circular-progressbar/dist/styles.css";
import { Helmet } from "react-helmet";
import { useToast } from '@chakra-ui/react';
import ChangingProgressProvider from "./ChangingProgress";
import "bootstrap/dist/css/bootstrap.min.css";
import { API } from "./API";



const ResetPassword = (props) => {

    const { account, setAccount, showloginButton, setShowloginButton, showlogoutButton, setShowlogoutButton } = useContext(AccountContext);
    const [isActive, setActive] = useState("false");
    const [message, setMessage] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const history = useHistory();
    const toast = useToast();

    const { token } = useParams();
    console.log(token);

    const resetPassword = async (e) => {
        e.preventDefault();
        if (token) {
            const pass = await axios.post(`http://localhost:4000/resetPassword/${token}`, {
                password,
                confirmpassword
            });
            if (pass.data.success) {
                toast({
                    title: "Success",
                    description: "Password Changed,Please Login Again",
                    status: "success"
                });
                history.push("/");
            } else if (!pass.data.success) {
                 toast({
                    title: "Failed",
                    description: "Invalid or Expire Token",
                    status: "error"
                });
            }
        }
    }

    return (
        <div className="login signup">
            <Helmet>
                <title>Reset Password</title>
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
                                    <h3>Reset Password</h3>
                                </span>
                            </button>
                        </div>
                    </Link>
                    <label htmlFor="email">Password:</label>
                    <input
                        id="username"
                        type="text"
                        name="email"
                        autoComplete="off"
                        placeholder="Enter New Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                   <label htmlFor="email">Confirm Password:</label>
                    <input
                        id="username"
                        type="text"
                        name="email"
                        autoComplete="off"
                        placeholder="Enter Confirm Password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <p
                        style={{
                            color: "green",
                        }}
                    >
                        {message}
                    </p>
                    <button id="submit" onClick={resetPassword}>
                       Submit
                    </button>
                </form>
            </div>
        </div>
    );
}
export default ResetPassword;
