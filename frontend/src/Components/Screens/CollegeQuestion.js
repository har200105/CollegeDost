import React, { useEffect, useState } from "react";
import "./Que.css";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@material-ui/icons/ThumbDownOutlined";
import { ChatBubble, ThumbDownAltOutlined } from "@material-ui/icons";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import Answer from "../Widgets/Answer";
import axios from "axios";
import AnswerModal from "../Widgets/AnswerModal";
import ReportIcon from "@material-ui/icons/Report";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import { API } from "../Widgets/API";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function CollegeQuestion(props) {
  const [text, setText] = useState("");
  const [user, setUser] = useState([]);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [open, setOpen] = useState(false);
  const [opend, setOpend] = useState(false);
  const [current, setCurrent] = useState([]);

  
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  

  const handleClickd = () => {
    setOpend(true);
  };

  const handleClosed = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpend(false);
  };


  const getPostUser = async (id) => {
    const usd = await axios.post(
      `${API}/getUserDetails`,
      { id }
    );
    if (usd) {
      setUser(usd.data);
    }
  };
  useEffect(() => {
    setCurrent(JSON.parse(localStorage.getItem("user")));
  }, []);
  const likePost = async (postId) => {
    await takeBackDislike(postId);
    await axios.put(
        `${API}/univlike`,
        { postId },
        {
          headers: {
            Authorization: "CollegeDost " + localStorage.getItem("jwt"),
          },
        }
      )
      .then((res) => {})
      .catch((e) => {
        console.log("Error  :" + e);
      });
  };

  const takeBackLike = async (id) => {
    await axios
      .put(
        `${API}/takebackunivlike`,
        { id },
        {
          headers: {
            Authorization: "CollegeDost " + localStorage.getItem("jwt"),
          },
        }
      );
  };

  const deletePost = async (id) => {
    const dp = await axios.delete(
      `${API}/deleteUnivPost/${id}`,
      {
        headers: {
          Authorization: "CollegeDost " + localStorage.getItem("jwt"),
        },
      }
    );

    if (dp.status === 201) {
      window.location.reload();
    }
  };

  const addToAdmin = async (id) => {
    await axios.post(
      "https://collegedost.cyclic.app/addUnivPostToAdmin",
      { id },
      {
        headers: {
          Authorization: "CollegeDost " + localStorage.getItem("jwt"),
        },
      }
    );
  };

  const dislike = async (id) => {
    handleClickd();
    await takeBackLike(id);
    await addDislike(id);
  };

const addDislike = async (id) => {
     axios
      .put(
        `${API}/univdislike`,
        { id },
        {
          headers: {
            Authorization: "CollegeDost " + localStorage.getItem("jwt"),
          },
        }
      )
  };

  const takeBackDislike = async (id) => {
    await axios
      .put(
        `${API}/takebackunivdislike`,
        { id },
        {
          headers: {
            Authorization: "CollegeDost " + localStorage.getItem("jwt"),
          },
        }
      );
  };

  return (
    <div className="posts">
      <div className="title">

        <img
          className="profile_pic"
          src={
            props.postedBy.avatar
              ? props.postedBy.avatar
              : "https://res.cloudinary.com/harshit111/image/upload/v1627476264/fqnrpqlujucrotiazxvc.png"
          }
          style={{
            height: "50px",
            width: "50",
            borderRadius: "40px",
            margin: "10px",
          }}
          alt=""
        />
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="info">
            Liked Successfully
          </Alert>
        </Snackbar>

        <Snackbar open={opend} autoHideDuration={3000} onClose={handleClosed}>
          <Alert onClose={handleClosed} severity="info">
            Disliked Successfully
          </Alert>
        </Snackbar>
        <Link
          style={{
            textStyle: "none",
            textDecoration: "none",
            color: "white",
          }}
          to={`/user/?${props.postedBy._id}`}
        >
          <b
            style={{
              textStyle: "none",
            }}
          >
            {props.postedBy.name}
          </b>
        </Link>
        {props.postedBy._id !== current._id ? (
          <ReportIcon
            style={{
              float: "right",
              color: "red",
              cursor: "pointer",
            }}
            onClick={() => addToAdmin(props.id.toString())}
          />
        ) : (
          <DeleteOutlinedIcon
            style={{
              float: "right",
              color: "red",
              cursor: "pointer",
            }}
            onClick={() => deletePost(props.id.toString())}
          />
        )}
      </div>
      <div className="description">{props.description}</div>
      {props.photo && <img className="pics" src={props.photo} alt="" />}
      {props.hasBeenCommented ? (
        <Answer commentedBy={props.commentedBy} replies={props.comments} />
      ) : (
        ""
      )}

      <div className="reaction">
        {!props.likes.includes(current._id) ? (
          <button className="like">
            <ThumbUpOutlinedIcon
              onClick={() => likePost(props.id.toString())}
              className="react-icon"
              fontSize="large"
              style={{ color: "white" }}
            />
          </button>
        ) : (
          <button className="like">
            <ThumbUpOutlinedIcon
              onClick={() => takeBackLike(props.id.toString())}
              className="react-icon"
              fontSize="large"
              style={{ color: "#2DFF5E" }}
            />
          </button>
        )}
        {!props.dislikes.includes(current._id) ? (
          <button className="dislike">
            <ThumbDownAltOutlined
              onClick={() => dislike(props.id.toString())}
              className="react-icon"
              fontSize="large"
              style={{ color: "white" }}
            />
          </button>
        ) : (
          <button className="dislike">
            <ThumbDownAltOutlined
              onClick={() => takeBackDislike(props.id.toString())}
              className="react-icon"
              fontSize="large"
              style={{ color: "black" }}
            />
          </button>
        )}
        <button className="answer">
          <AnswerModal
            text={text}
            setText={setText}
            postId={props.id}
            isUniv={true}
          />
        </button>

        <div className="count">
          <b>{props.likes.length - props.dislikes.length}</b>
        </div>
      </div>
    </div>
  );
}
