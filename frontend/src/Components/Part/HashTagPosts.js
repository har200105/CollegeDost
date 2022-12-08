import { React, useState } from "react";
import Question from "./Que";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import "./Home.css";
import Editor from "./Editor";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Answer from "./Answer";
import axios from "axios";
import CommentModal from "./CommentModal";
import { useEffect } from "react";
import "./Home.css";
import "bootstrap/dist/css/bootstrap.css";
import land from "./DrawKit-daily-life-vector-illustrations/PNG/1.png";
import ShadowScrollbars from "./ShadowScrollbars";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import Header from "./Header.js";
import Footer from "./Footer";
import Content from "./Content";
import land1 from "./landing_1.jpg";
import SecFooter from "./SecFooter";
import HashTagContent from "./HashTagPosts";
import {Link, useLocation} from 'react-router-dom';
import "./Home.css";
import CollegeQuestion from "./CollegeQuestion";
import { API } from "./API";

export default function HashTagCollege({match}) {
  const [posts, setPosts] = useState([]);
  const[hashTag,setHashTag]=useState([]);
  const {search} =  useLocation();
  console.log(search.replace("?","#"));
 
  const getHashTagPosts = async()=>{
    const ps = await axios.post(`${API}/getHashtagsPosts`,{
      hashtag:search.replace("?","#")
    },{
      headers:{
        "Authorization": localStorage.getItem("jwt"),
      }
    });

    console.log(ps);

  setPosts(ps.data);

  const d = await axios.get(`${API}/topHashtagsUniv`,{
      headers:{
        Authorization: localStorage.getItem("jwt"),
      }
    });
    if(d.status===201){
      setHashTag(d.data);
    }
  }


  useEffect(() => {
   getHashTagPosts();
  }, []);
  return (
    <div className="home">
    <div >
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
      <div className="landing-line">Get your questions answered...</div>
    </div>
   
    <div className="sec-nav">
    { 
      hashTag.map(h=>(

        <div class="secnav-items one1">
        <Link  to ={`/hashtag/?${h.hashTagtext.replace("#","")}`}>{h.hashTagtext}</Link>
        </div>
      ))
    }
      
      <div className="secnav-items add-Question">
        {/* <button className="btn btn-outline-success">
          <b>+</b>
        </button> */}
      </div>
    </div>
    </div>
    <div className="content">
      <div className="sidebar">
        
      </div>
      <div className="feed">
        {posts.map((p) => (
          <CollegeQuestion
            description={p.body}
            hasBeenCommented={p.hasBeenCommented}
            comments={p.comments.map((x)=>(
              <div>
              <p style={{
                fontWeight:"bold"
              }}>{x.commentedBy.name}</p>
              <p>{x.text}</p>
              </div>
            ))}
            id={p._id}
            setPosts={setPosts}
            posts={posts}
            likes={p.likes}
            dislikes={p.dislikes}
            postedBy={p.postedBy}
          />
        ))}
      </div>
      <div className="ad sidebar2">
        
      </div>
    </div>
    </div>
  );
}
