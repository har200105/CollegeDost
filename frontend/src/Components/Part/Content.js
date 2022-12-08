import React, { useState } from "react";
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
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts, getRecentAllPosts } from "../../actions/postAction";
import { getRecentResources } from "../../actions/resourceAction";

export default function Content() {
  const dispatch = useDispatch();
  const AllpostState = useSelector(state => state.getallPostReducer);
  const RecentPostState = useSelector(state => state.getRecentAllPostsReducer);
  const RecentResourcesState = useSelector(state => state.getRecentResourcesReducer);
  const { loading, posts, error } = AllpostState;
  const { recentposts, loadingrecent, errorrecent } = RecentPostState;
  const { recentResources } = RecentResourcesState;

  useEffect(() => {
    dispatch(getAllPosts());
    dispatch(getRecentResources());
    dispatch(getRecentAllPosts());
  }, [dispatch]);


  return (
    <div className="content">
      <div className="sidebar">
        <hr />
        <h1> Recently Asked Questions</h1>
        {errorrecent && (
          <div>
            Error
          </div>
        )}
        {loadingrecent && (
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
        {recentposts && (
          recentposts.map((i, index) => (
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
        )}
        <hr />
      </div>
      <div className="feed">
        <Editor university={false} />
        {loading && (
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
        {error && <div>Error</div>}
        {(!loading && !error) && (
          posts.map((p) => (
            <Question
              description={p.body}
              hasbeenCommented={p.hasBeenCommented}
              comments={p.comments.map((x) => (
                <div>
                  <Link to={`/user?${x?.commentedBy?._id}`} style={{
                     textDecoration:"none"
                  }}>
                  <p
                    style={{
                        fontWeight: "bold",
                        textDecoration:"none"
                    }}
                  >
                    {x.commentedBy.name}
                    </p>
                    </Link>
                  <p>{x.text}</p>
                </div>
              ))}
              id={p._id}
              posts={posts}
              likes={p.likes}
              dislikes={p.dislikes}
              postedBy={p.postedBy}
              photo={p.photo}
            />
          ))
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
        ):<div className="resource_univs res_card">
        No Resources Available Currently
       </div>}
        <hr />
      </div>
    </div>
  );
}
