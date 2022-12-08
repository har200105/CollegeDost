import React from "react";
import "./Answer.css";
import { Link } from "react-router-dom";

export default function Answer(props) {

  return (
    <div className="ans">
      <div className="user-title">
         <Link
          style={{
            textStyle: "none",
            textDecoration: "none",
            color: "white",
          }}
          to={`/user/?${props.commentedBy?._id}`}
        >
          <b
          >
              {props.commentedBy}
          </b>
        </Link>
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
