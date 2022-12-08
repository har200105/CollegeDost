import React,{  useEffect, useState } from "react";
import Question from "./Part/Que";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import "../Components/Part/Home.css";
import Editor from "./Part/Editor";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Answer from "./Part/Answer";
import axios from "axios";
import { Link } from "react-router-dom";
import CollegeQuestion from "./Part/CollegeQuestion";
import { API } from "./Part/API";
import { useDispatch, useSelector } from "react-redux";
import { getCollegePosts, getRecentCollegePosts } from "../actions/collegePostAction";
import { getRecentResources } from "../actions/resourceAction";

export default function UnivContent() {

  const dispatch = useDispatch();

  const {collegeposts,loading,error} = useSelector((state) => state.getCollegePostReducer);
  const {recentcollegeposts} = useSelector((state) => state.getRecentCollegePostsReducer);
  const {recentResources} = useSelector((state)=>state.getRecentResourcesReducer);

  useEffect(()=>{
    dispatch(getCollegePosts());
    dispatch(getRecentCollegePosts());
    dispatch(getRecentResources());
  },[dispatch])

  return (
    <div className="content">
      <div className="sidebar">
        <hr />
        <h1> Recently Asked Questions</h1>
        {
          recentcollegeposts.length > 0 ? (
          recentcollegeposts.map((i, index) => (
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
              <div style={{
            marginTop:"20px"
          }}>
           No Questions Available Currently
          </div>
        )}
        <hr />
      </div>
      <div className="feed">
        <Editor university={true} />,
        {collegeposts.length > 0 ? (
          collegeposts.map((p) => (
            <CollegeQuestion
              description={p.body}
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
              hasBeenCommented={p.hasBeenCommented}
              id={p._id}
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

        {recentResources.length > 0  ? (
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
        ): <div className="resource_univs res_card">
           No Resources Available Currently
          </div>}
        <hr />
      </div>
    </div>
  );
}
