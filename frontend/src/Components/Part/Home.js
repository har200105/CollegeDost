import "./Home.css";
import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import land from "./assets/1.png";

import "react-awesome-slider/dist/styles.css";
import Header from "./Header.js";
import Footer from "./Footer";
import Content from "./Content";

import SecFooter from "./SecFooter";

import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import "bootstrap/dist/js/bootstrap.js";

import { useDispatch, useSelector } from "react-redux";
import { getAllHashtags } from "../../actions/hashTagAction";

const Home = (props) => {

  const dispatch = useDispatch();
  const hashtagSelector = useSelector((state) => state.getAllHashtagsReducer);
  const { hashTags, loadingAllHashtags, errorAllHashtags } = hashtagSelector;

  useEffect(() => {
    dispatch(getAllHashtags());
  }, [dispatch]);

  return (
    <div className="home">
      <Helmet>
        <title>Home</title>
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
          errorAllHashtags && (
            <div>
              Something Went Wrong
            </div>
          )
        }
        {hashTags.map((h) => (
          <div class="secnav-items one1">
            <Link to={`/hashtag/?${h.hashTagtext.replace("#", "")}`}>
              {h.hashTagtext}
            </Link>
          </div>
        ))}
        <div className="secnav-items add-Question">
        </div>
      </div>
      <Content />

      <div className="footer-huge">
        <Footer />
      </div>
      <div className="footer-small">
        <SecFooter />
      </div>
    </div>
  );
}
export default Home;
