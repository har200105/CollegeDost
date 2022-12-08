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
import ChangingProgressProvider from "./ChangingProgress";
import "bootstrap/dist/css/bootstrap.min.css";
import { API } from "./API";
import { useToast } from "@chakra-ui/react";

const LoginValues = {
  email: "",
  password: "",
};

const VerifyLink = () => {
  const { account, setAccount,showloginButton, setShowloginButton, showlogoutButton, setShowlogoutButton } = useContext(AccountContext);
  const [isActive, setActive] = useState("false");
  const [login, setLogin] = useState(LoginValues);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();
  const toast = useToast();
  const { token } = useParams();
  console.log(token);

  const verifyUser = async (e) => {
    e.preventDefault();
    await axios.post(`${API}/user/verifyEmail`, {
      token
    }).then((s) => {
      if (s.data.success) {
        history.push("/");
          toast({
          title: "Success", 
          description: s.data.message,
          status:"success",
          isClosable:true
        });
      } else {
        toast({
          title: "Failed", 
          description: s.data.message,
          status: "error",
          isClosable:true
        });
      }
    });
  }



  return (
    <div className="login signup">
      <Helmet>
        <title>Verify Email</title>
      </Helmet>
      <div className={isActive ? "light" : null}>
        <div className="wrapper-header">
          <header className="mt-2 text-center" style={{ color: "white" }}>
            College Dost
          </header>
        </div>
        <form className="form">
          <h2>Welcome to College Dost</h2>
          <h4>Please verify your Email</h4>
          <p
            style={{      
              color: "green",
            }}
          >
          {message}
          </p>
            <button id="submit" onClick={(e) => verifyUser(e)}>
              Verify
            </button>
        </form>
      </div>
    </div>
  );
};
export default VerifyLink;
