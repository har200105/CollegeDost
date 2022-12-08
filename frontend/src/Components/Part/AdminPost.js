import React from "react";
import "./Admin.css";
import axios from 'axios';
import { API } from "./API";

export default function AdminPost(props) {
  
  const deletePost = async(id)=>{
    const dp = await axios.delete(`${API}/deleteAdminUnivPost/${id}`,{
      headers:{
        Authorization:localStorage.getItem("jwt"),
      }
    });


    if(dp.status===201){
      window.location.reload();
      console.log("Post Deleted");
    }
  }

  
  const deletePostMain = async(id)=>{
    const dp = await axios.delete(`${API}/deleteAdminPost/${id}`,{
      headers:{
        Authorization: localStorage.getItem("jwt"),
      }
    });


    if(dp.status===201){
      window.location.reload();
      console.log("Post Deleted");
    }

  }


  return (
    <div className="admin_post">
      <div className="admin_post_content">
        <div className="title">{props.post.postedBy.name}</div>
        <p>{props.post.body}</p>
      </div>
      {
        props.post.photo &&
          <img src = {props.post.photo} alt="" style={{
          objectFit: "contain",
          width: '100%',
          height: '100%'
          }}/>
      }
      <button  onClick ={()=> !props.post.university ? deletePostMain(props.post.postId): deletePost(props.post.postId)} className="delete">
        Delete
      </button>
      <br />
    </div>
  );
}
