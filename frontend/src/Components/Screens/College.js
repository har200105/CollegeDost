import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import land from "../Part/assets/1.png";
import "react-awesome-slider/dist/styles.css";
import axios from "axios";
import Header from "../Widgets/Header";
import Footer from "../Widgets/Footer";
import SecFooter from "./SecFooter";
import "./Home.css";
import {Link} from 'react-router-dom';
import UnivContent from './UnivContent'
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useEffect } from "react";
import { API } from "../Widgets/API";


export default function College() {
  const[hashTag,setHashTag]=useState([]);


  const getLastestHashtags=async(e)=>{
    const d = await axios.get(`${API}/topHashtagsUniv`,{
      headers:{
        Authorization: "CollegeDost " + localStorage.getItem("jwt"),
      }
    });
    if(d.status===201){
      setHashTag(d.data);
    }
  }

  useEffect(()=>{
    getLastestHashtags();
  },[hashTag])

  return (
    <div className="home college">
       <Helmet>

<title>College</title>
</Helmet>
      <Header />
      <div className="landing">
        <img
          className="landing-img"
          src={land}
          style={{
            height: "33%",
            width: "33%",
            marginTop: "10px",
            float: "left",
            marginLeft: "20px",
          }}
          alt=""
        />
        <div className="landing-line">Get your questions answered....</div>
      </div>
      <div className="sec-nav">
      { 
        hashTag.map(h=>(

          <div class="secnav-items one1">
          <Link  to = {`/hashtagCollege/?${h.hashTagtext.replace("#","")}`}>{h.hashTagtext}</Link>
          </div>
        ))
      }
        <div className="secnav-items add-Question">
          <button className="btn btn-outline-success">
            <b>+</b>
          </button>
        </div>
      </div>
      <UnivContent />

      <div className="footer-huge">
        <Footer />
      </div>
      <div className="footer-small">
        <SecFooter />
      </div>
    </div>
  );
}
