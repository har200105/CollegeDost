import React from "react";
import "./Answer.css";

export default function Answer(props) {
  return (
    <div className="ans">
    <div className="user-title">
    {props.commentedBy}
    
    {
      props.replies.map((x,index)=>(
        <>
        <p id={index}>{x}</p>
        </>
      ))
    }
    </div>
    </div>  
  );
}
