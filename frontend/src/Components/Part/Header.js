import React from "react";
import "./Home.css";
import "bootstrap/dist/css/bootstrap.css";
import { Link, useHistory } from "react-router-dom";
import logo from "./clg-dost.png";
import { useState } from "react";
import axios from "axios";
import { List, ListItem } from "@material-ui/core";
import { useSelector } from "react-redux";

export default function Header() {
  
  const [searchs, setSearch] = useState("");
  const { user,isAuthenticated } = useSelector((state) => state.loadUserReducer);
  const history = useHistory();

  const Logout = async() => {
     localStorage.removeItem("jwt");
     localStorage.removeItem("user");
    history.push("/");
    window.location.reload();
  };

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark ">
        <div class="container-fluid">
          <Link class="navbar-brand" to="/home" aria-label="home">
            <img
              class="logo1"
              src={logo}
              style={{
                height: "100px",
                width: "100px",
                background: "white",
                border: "2.5px solid #76C893",
                borderRadius: "10px",
              }}
              alt=""
            />
          </Link>

          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link class="nav-link active" aria-current="page" to="/home">
                  Home
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/college">
                  College
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/resources">
                  Resources
                </Link>
              </li>
              <li class="nav-item">
                <form class="d-flex">
                  <input
                    class="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <Link to={`/search/?${searchs}`}>
                    <button class="btn btn-outline-success" type="submit">
                      Search Resources
                    </button>
                  </Link>

                  <Link to={`/searchUser/?${searchs}`}>
                    <button
                      class="btn btn-outline-success"
                      type="submit"
                      style={{
                        marginLeft: "5px",
                      }}
                    >
                      Search User
                    </button>
                  </Link>
                </form>
              </li>
            </ul>
          </div>
        </div>
        <Link to="/profile">
          <img
            className="profile_pic mr-2"
            src={
            user?.avatar
                ? user?.avatar
                : "https://res.cloudinary.com/harshit111/image/upload/v1627476410/q1rjnignh5djpnujltyy.png"
            }
            style={{
              objectFit: "contain",
              height: "70px",
              width: "70px",
              borderRadius: "50%",
            }}
            alt=""
          />
        </Link>
        <button
          style={{
            marginLeft:"20px"
          }}
          class="logout btn btn-outline-success"
          type="submit"
          onClick={() => Logout()}
        >                                   
          Logout
        </button>
      </nav>
    </div>
  );
}
