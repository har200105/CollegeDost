import React from "react";
import "./Home.css";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import { Link } from "react-router-dom";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import footerlogo from "./footer_logo.png";

export default function SecFooter() {
  return (
    <div className="sec-footer">
     
      <img
        src={footerlogo}
        style={{
          height: "100px",
          width: "100px",
        }}
      />
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
  );
}
