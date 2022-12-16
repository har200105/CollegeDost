import "./Home.css";
import "bootstrap/dist/css/bootstrap.css";
import React,{ useState } from "react";
import land from "../Part/assets/1.png";
import Question from "./Que";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import ShadowScrollbars from "./ShadowScrollbars";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import Header from "../Widgets/Header";
import Footer from '../Widgets/Footer'
import Content from "../Widgets/Content";
import land1 from "./landing_1.jpg";
import SecFooter from "./SecFooter";
import CommentModal from "../Widgets/CommentModal";
import axios from "axios";
// import HashTagContent from "./HashTagPosts";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import "bootstrap/dist/js/bootstrap.js";
import { API } from "../Widgets/API";

const Home = (props) => {
  const [isHashtag, setHashtag] = useState(false);
  const [hashTag, setHashTag] = useState([]);
  const location = useLocation();
  // const getHashTagPosts = async(e)=>{
  //   console.log(e.target.text);
  //   const ps = await axios.post('http://localhost:7000/getHashtags',{
  //     hashtag:e.target.text.toString()
  //   },{
  //     headers:{
  //       "Authorization": "CollegeDost " + localStorage.getItem("jwt"),
  //     }
  //   });

  //   console.log(ps);

  // setHashTagPosts(ps.data);
  // }

  const getLastestHashtags = async (e) => {
    const d = await axios.get(`${API}/topHashtags`, {
      headers: {
        Authorization: "CollegeDost " + localStorage.getItem("jwt"),
      },
    });
    if (d.status === 201) {
      setHashTag(d.data);
    }
  }

  useEffect(() => {
    getLastestHashtags();
  }, [hashTag]);

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
        {hashTag.map((h) => (
          <div class="secnav-items one1">
            <Link to={`/hashtag/?${h.hashTagtext.replace("#", "")}`}>
              {h.hashTagtext}
            </Link>
          </div>
        ))}
        <div className="secnav-items add-Question">
          <button className="btn btn-outline-success">
            <b>+</b>
          </button>
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
