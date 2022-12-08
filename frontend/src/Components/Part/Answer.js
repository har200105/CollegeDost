import React from "react";
import "./Answer.css";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@material-ui/icons/ThumbDownOutlined";
import { ChatBubble, ThumbDownAltOutlined } from "@material-ui/icons";
import CommentModal from "./CommentModal";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import { Link } from "react-router-dom";

export default function Answer(props) {
  console.log(props);
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
