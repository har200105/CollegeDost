import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import land from "./assets/1.png";
import "react-awesome-slider/dist/styles.css";
import Header from "./Header.js";
import Footer from "./Footer";
import SecFooter from "./SecFooter";
import "./Home.css";
import { Link } from 'react-router-dom';
import UnivContent from "../UnivContent";
import { Helmet } from "react-helmet";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCollegeHashTags } from "../../actions/hashTagAction";


export default function College() {



  const dispatch = useDispatch();
  const UnivHashtags = useSelector(state => state.getCollegeHashTagsReducer);
  const { hashTagsUniv, loadinghashtaguniv, errorhashtaguniv } = UnivHashtags;

  useEffect(() => {
    dispatch(getCollegeHashTags());
  }, [dispatch])

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
          errorhashtaguniv && (
            <div>
              Error
            </div>
          )
        }
        {
          hashTagsUniv.map((h) => (
            <div class="secnav-items one1">
              <Link to={`/hashtagCollege/?${h.hashTagtext.replace("#", "")}`}>{h.hashTagtext}</Link>
            </div>
          ))
        }
        <div className="secnav-items add-Question">
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
