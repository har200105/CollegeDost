import React,{  useEffect, useState } from "react";
import Question from "./Part/Que";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import './Home.css'
import Editor from "./Part/Editor";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Answer from "./Part/Answer";
import axios from "axios";
import { Link } from "react-router-dom";
import CollegeQuestion from "./Part/CollegeQuestion";
import { API } from "./Part/API";

export default function UnivContent() {
  const [posts, setPosts] = useState([]);
  const [recentResources, setRecentResources] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);

  const getRecentPosts = async () => {
    const recentPosts = await axios.get(
      `${API}/getRecentUnivPosts`,
      {
        headers: {
          Authorization: "CollegeDost " + localStorage.getItem("jwt"),
        },
      }
    );
    if (recentPosts.status === 201) {
      setRecentPosts(recentPosts.data);
    }

    const univposts = await axios.get(
      `${API}/universityPosts`,
      {
        headers: {
          Authorization: "CollegeDost " + localStorage.getItem("jwt"),
        },
      }
    );
    setPosts(univposts.data.post);
    console.log(univposts.data.post);

    const getRecentResources = await axios.get(
      `${API}/getRecentResources`,
      {
        headers: {
          Authorization: "CollegeDost " + localStorage.getItem("jwt"),
        },
      }
    );
    setRecentResources(getRecentResources.data);
    if (getRecentResources) {
    }
  };

  useEffect(() => {
    getRecentPosts();
  });

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
        <Editor university={true} />,
        {posts.length > 0 ? (
          posts.map((p) => (
            <CollegeQuestion
              description={p.body}
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
              hasBeenCommented={p.hasBeenCommented}
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
            No Questions
          </div>
        )}
      </div>
      <div className="ad sidebar2">
        <hr />
        <h1 className="mx-auto">Recently Added Resources</h1>

        {recentResources.length > 0 ? (
          recentResources.map((r) => (
            <div className="resource_univs res_card">
              <p className="res-uploader-name">
                Uploaded By : {r.resourceUploaderName.name}
              </p>
              <p className="res-name">Resource Name:{r.resourcesname}</p>
              <a href={r.resourceUrl} download target="__">
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
