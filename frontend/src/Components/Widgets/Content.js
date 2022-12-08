import React,{  useState } from "react";
import Question from "./Que";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import "./Home.css";
import Editor from "./Editor";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Answer from "./Answer";
import axios from "axios";
import CommentModal from "./CommentModal";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { API } from "./API";

export default function Content() {
  const [posts, setPosts] = useState([]);
  const [recentResources, setRecentResources] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);

  const getRecentPosts = async () => {
    const recentPostsxD = await axios.get(
      `${API}/getRecentPosts`,
      {
        headers: {
          Authorization: "CollegeDost " + localStorage.getItem("jwt"),
        },
      }
    );
    if (recentPostsxD.status === 201) {
      setRecentPosts(recentPostsxD.data);
    }

    const getRecentResources = await axios.get(
      `${API}/getRecentResources`,
      {
        headers: {
          Authorization: "CollegeDost " + localStorage.getItem("jwt"),
        },
      }
    );
    if (getRecentResources.data) {
      setRecentResources(getRecentResources.data);
    }

    const globalposts = await axios.get(
      `${API}/globalposts`
    );
    if (globalposts.data) {
      console.log(globalposts.data.posts);
      setPosts(globalposts.data.posts);
    }
  };

  useEffect(() => {
    getRecentPosts();
  },[]);

  
  return (
    <div className="content">
      <div className="sidebar">
        <hr />
        <h1> Recently Asked Questions</h1>
        {recentPosts.length > 0 ? (
          recentPosts.map((i, index) => (
            <div>
              <hr />
              <Link
                style={{
                  textStyle: "none",
                  textDecoration: "none",
                  color: "black",
                }}
                to={`/user/?${i.postedBy._id}`}
              >
                <b
                  style={{
                    textStyle: "none",
                  }}
                >
                  Posted By :{i.postedBy.name}
                </b>
              </Link>
              <p>{i.body}</p>
            </div>
          ))
        ) : (
          <div
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "40%",
            }}
          >
            <span
              className="spinner-border spinner-border-lm"
              role="status"
              aria-hidden="true"
            ></span>
          </div>
        )}
        <hr />
      </div>
      <div className="feed">
        <Editor university={false} />
        {posts.length > 0 ? (
          posts.map((p) => (
            <Question
              description={p.body}
              hasbeenCommented={p.hasBeenCommented}
              comments={p.comments.map((x) => (
                <div>
                  <p
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    {x.commentedBy.name}
                  </p>
                  <p>{x.text}</p>
                </div>
              ))}
              id={p._id}
              setPosts={setPosts}
              posts={posts}
              likes={p.likes}
              dislikes={p.dislikes}
              postedBy={p.postedBy}
              photo={p.photo}
            />
          ))
        ) : (
          
          <div
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "40%",
            }}
          >
            <span
              className="spinner-border spinner-border-lm"
              role="status"
              aria-hidden="true"
            ></span>
          </div>
        )}
      </div>
      <div className="ad sidebar2">
        <hr />
        <h1
          style={{
            marginBottom: "20px",
          }}
        >
          Recently Added Resources
        </h1>
        {recentResources.length > 0 ? (
          recentResources.map((r) => (
            <div className="resource_univs res_card">
              <p className="mx-auto res-uploader-name">
                Uploaded By : {r.resourceUploaderName.name}
              </p>
              <p className="mx-auto res-name">
                Resource Name:{r.resourcesname}
              </p>
              <a href={r.resourceUrl} download target="__" className="mx-auto">
                <button className="resource_button_new">Get Resource</button>
              </a>
            </div>
          ))
        ) : (
          <div
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "10%",
            }}
          >
            <span
              className="spinner-border spinner-border-lm"
              role="status"
              aria-hidden="true"
            ></span>
          </div>
        )}
        <hr />
      </div>
    </div>
  );
}
