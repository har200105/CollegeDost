import React, { useState, lazy, Suspense, useContext, useEffect } from "react";
import Signup from "./Components/Part/Signup";
import Login from "./Components/Part/Login";
import Admin from "./Components/Part/Admin";
import Home from "./Components/Part/Home";
import Resources from "./Components/Part/Resources";
import College from "./Components/Part/College";
import Profile from "./Components/Part/Profile";
import "./App.css";
import {AuthContext, AuthContextProvider} from "./ContextProvider/ContextProvider";
import HashTag from "./Components/Part/Hashtagss";
import SearchResources from "./Components/Part/SearchPage";
import UserProfile from "./Components/Part/UserProfile";
import HashTagCollege from "./Components/Part/HashTagPosts";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import SearchUser from "./Components/Part/SearchUser";
import AccountProvider from "./ContextProvider/AccountProvider";
import ForgetPassword from "./Components/Part/ForgetPassword";
import VerifyLink from "./Components/Part/VerifyLink";
import ResetPassword from "./Components/Part/ResetPassword";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./actions/userAction";
import Loader from "./Components/Loader";

function App() {

  const dispatch = useDispatch();
  const { user, isAuthenticated, loading } = useSelector((state) => state.loadUserReducer);

  useEffect(() => {
    if (localStorage.getItem(`jwt`)) {
      dispatch(loadUser());
    }
  }, []);

  if (loading) {
    return <Loader/>
  }

  return (
    <React.Fragment>
      <AuthContextProvider>
        <AccountProvider>
          <Router>
            
            <Switch>
              <Route exact path="/">
                {isAuthenticated ? <Home /> : <Signup />}
              </Route>
              
              <Route exact path="/Login">
              { isAuthenticated ? <Redirect to="/home"/> : <Login />}
              </Route>

              <Route exact path="/resources">
                {isAuthenticated ? <Resources/> : <Redirect to="/Login"/> }
              </Route>

              <Route exact path="/College">
                 {isAuthenticated ? <College/> : <Redirect to="/Login"/> }
              </Route>

              <Route exact path="/Profile">
                 {isAuthenticated ? <Profile/> : <Redirect to="/Login"/> }
              </Route>

              <Route exact path="/home">
                {isAuthenticated ? <Home /> : <Redirect to="/Login"/>}
              </Route>

              <Route exact path="/hashtag">
               {isAuthenticated ? <HashTag/> : <Redirect to="/Login"/> }
              </Route>

              <Route exact path="/hashtagCollege">
                 {isAuthenticated ? <Resources/> : <Redirect to="/Login"/> }
              </Route>

              <Route exact path="/search">
               {isAuthenticated  ? <SearchResources/> : <Redirect to="/Login"/>}
              </Route>

              <Route exact path="/forgotpassword">
                {isAuthenticated ? <ForgetPassword/> : <Redirect to="/Login"/>}
              </Route>

              <Route exact path="/searchUser">
                {isAuthenticated ? <SearchUser /> :  <Redirect to="/Login"/>}
              </Route>

              <Route exact path="/user">
                {isAuthenticated ? <UserProfile/>: <Redirect to="/Login"/>}
              </Route>

                <Route exact path="/forgetPassword">
               {isAuthenticated ? <Redirect to="/home"/> : <ForgetPassword />}
              </Route>

               <Route exact path="/resetPassword/:token">
                {isAuthenticated ? <Redirect to="/home" /> : <ResetPassword />}
              </Route>

              <Route exact path="/verify">
               {isAuthenticated ? <Redirect to="/home"/> : <VerifyLink />}
              </Route>

            </Switch>
          </Router>
        </AccountProvider>
      </AuthContextProvider>
    </React.Fragment>
  );
}

export default App;
