import React from "react";
import "./Home.css";
import footerlogo from "./footer_logo.png";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import { Link } from "react-router-dom";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

export default function Footer() {
  return (
    <div>
      <footer className="footer">
        <img src={footerlogo} alt="" />
        <div className="footer-content f-1">
          <div className="footer-title" style={{ fontSize: "1.5rem" }}>
            <b>Explore</b>
          </div>
          <div className="footer-link" style={{ fontSize: "1rem" }}>
            <Link to="/home">Home</Link>
          </div>
          <div className="footer-link" style={{ fontSize: "1rem" }}>
            <Link to="/college">College</Link>
          </div>
          <div className="footer-link" style={{ fontSize: "1rem" }}>
            <Link to="/resources">Resources</Link>
          </div>
          <div className="footer-link" style={{ fontSize: "1rem" }}>
            <Link to="/profile">Profile</Link>
          </div>

          {JSON.parse(localStorage.getItem("user")).isAdmin ? (
            <div className="footer-link" style={{ fontSize: "1rem" }}>
              <Link to="/Admin">Admin</Link>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="footer-content f-1">
          <div className="footer-title" style={{ fontSize: "1.5rem" }}>
            <b>Visit</b>
          </div>
          <div className="footer-link" style={{ fontSize: "1rem" }}>
            <a href="#">Privacy Policy</a>
          </div>
          <div className="footer-link" style={{ fontSize: "1rem" }}>
            <a href="#">Terms and Conditions</a>
          </div>
        </div>
        <br />
        <br />
        <div className="footer-content f-1">
          <div className="footer-title">
            <b>Contact us at</b>
          </div>
          <div className="footer-link">
           Its a 1st version of our College dost Project,
           <br/>
           Do let us know if any feedback is there 
           <br/> Watch The Working Video
          </div>
        </div>
        <div className="footer-content">
          <div className="footer-link">
            <div className="connect-us">
              <button className="connect">Connect with Us</button>
              <div className="social-media">
                <button>
                  <InstagramIcon
                    className="socialicon"
                    fontSize="large"
                    style={{ color: "white" }}
                  />
                </button>
                <button>
                  <TwitterIcon
                    className="socialicon"
                    fontSize="large"
                    style={{ color: "white" }}
                  />
                </button>
                <button>
                  <LinkedInIcon
                    className="socialicon"
                    fontSize="large"
                    style={{ color: "white" }}
                  />
                </button>
                <button>
                  <FacebookIcon
                  
                    className="socialicon"
                    fontSize="large"
                    style={{ color: "white" }}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
