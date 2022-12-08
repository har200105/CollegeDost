import React from "react";
import "./Answer.css";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@material-ui/icons/ThumbDownOutlined";
import { ChatBubble, ThumbDownAltOutlined } from "@material-ui/icons";
import CommentModal from "./CommentModal";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";

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
