import React, { useEffect, useState } from "react";
import "./Que.css";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ThumbDownOutlinedIcon from "@material-ui/icons/ThumbDownOutlined";
import { ChatBubble, ThumbDownAltOutlined } from "@material-ui/icons";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import Answer from "./Answer";
import axios from "axios";
import AnswerModal from "./AnswerModal";
import { Link } from "react-router-dom";
import ReportIcon from "@material-ui/icons/Report";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { API } from "./API";
import { useToast } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { getAllPosts, getThisUserAllposts, getThisUserUnivposts, getUserposts } from "../../actions/postAction";
import { getCollegePosts } from "../../actions/collegePostAction";


export default function Question(props) {

  const [user, setUser] = useState([]);
  const toast = useToast();
  const dispatch = useDispatch();
  const [text, setText] = useState("");
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
    const usd = await axios.post(`${API}/getUserDetails`, {
      id,
    });
    if (usd) {
      setUser(usd.data);
    }
  };
  useEffect(() => {
    setCurrent(JSON.parse(localStorage.getItem("user")));
    console.log(JSON.parse(localStorage.getItem("user")));
  }, []);

  const likePost = async (postId) => {
    await takeBackDislike(postId);
    handleClick();
    await axios
      .put(
        `${API}/mainlike`,
        { postId },
        {
          headers: {
            Authorization: localStorage.getItem("jwt"),
          },
        }
      )
      .then((res) => {
        dispatch(getAllPosts());
        dispatch(getUserposts());
        dispatch(getCollegePosts());
        dispatch(getThisUserAllposts(props.postedBy._id));
        dispatch(getThisUserUnivposts(props.postedBy._id));
      })
      .catch((e) => {
        console.log("Error  :" + e);
      });
  };

  const takeBackLike = async (id) => {
    console.log("Liking");
    console.log(id);
    await axios
      .put(
        `${API}/takebackmainlike`,
        { id },
        {
          headers: {
            Authorization:  localStorage.getItem("jwt"),
          },
        }
      )
      .then((res) => {
        dispatch(getAllPosts());
                dispatch(getUserposts());
        dispatch(getCollegePosts());
         dispatch(getThisUserAllposts(props.postedBy._id));
    dispatch(getThisUserUnivposts(props.postedBy._id));
        console.log(res);
      })
      .catch((e) => {
        console.log("Error  :" + e);
      });
  };

  const dislike = async (id) => {
    await takeBackLike(id);
    handleClickd();
    console.log("Liking");
    console.log(id);
    axios
      .put(
        `${API}/maindislike`,
        { id },
        {
          headers: {
            Authorization: localStorage.getItem("jwt"),
          },
        }
      )
      .then((res) => {
        dispatch(getAllPosts());
        dispatch(getUserposts());
        dispatch(getCollegePosts());
         dispatch(getThisUserAllposts(props.postedBy._id));
    dispatch(getThisUserUnivposts(props.postedBy._id));
      })
      .catch((e) => {
        console.log("Error  :" + e);
      });
  };

  const takeBackDislike = async (id) => {
    console.log("Liking");
    console.log(id);
    await axios
      .put(
        `${API}/takebackmaindislike`,
        { id },
        {
          headers: {
            Authorization: localStorage.getItem("jwt"),
          },
        }
      )
      .then((res) => {
        dispatch(getAllPosts());
        dispatch(getUserposts());
        dispatch(getCollegePosts());
        dispatch(getThisUserAllposts(props.postedBy._id));
        dispatch(getThisUserUnivposts(props.postedBy._id));
        console.log(res);
      })
      .catch((e) => {
        console.log("Error  :" + e);
      });
  };

  const deletePost = async (id) => {
    const dp = await axios.delete(`${API}/deletePost/${id}`, {
      headers: {
        Authorization: localStorage.getItem("jwt"),
      },
    });

    if (dp.status === 201) {
      dispatch(getAllPosts());
      dispatch(getUserposts());
      dispatch(getCollegePosts());
      dispatch(getThisUserAllposts(props.postedBy._id));
      dispatch(getThisUserUnivposts(props.postedBy._id));
      console.log("Post Deleted");
    }
  };

  const addToAdmin = async (id) => {
    console.log(id);
    await axios.post(
      `${API}/addPostToAdmin`,
      { id },
      {
        headers: {
          Authorization: localStorage.getItem("jwt"),
        },
      }
    ).then((s) => {
      if (s.data.success) {
        toast({
          title:'Post Reported',
          status: 'warning',
        })
      }
    });
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

      {props.hasbeenCommented ? (
        <Answer commentedBy={props.commentedBy} replies={props.comments} />
      ) : (
        ""
      )}
      <div className="reaction" >
        {props.likes.includes(current._id) ? (
          <button className="like">
            <ThumbUpIcon
              onClick={() => takeBackLike(props.id.toString())}
              className="react-icon"
              fontSize="large"
              style={{ color: "#2DFF5E" }}
            />
          </button>
        ) : (
          <button className="like">
            <ThumbUpOutlinedIcon
              onClick={() => likePost(props.id.toString())}
              className="react-icon"
              fontSize="large"
              style={{ color: "white" }}
            />
          </button>
        )}
        {props.dislikes.includes(current._id) ? (
          <button className="dislike">
            <ThumbDownIcon
              onClick={() => takeBackDislike(props.id.toString())}
              className="react-icon"
              fontSize="large"
              style={{ color: "#FD4040" }}
            />
          </button>
        ) : (
          <button
            className="dislike"
            style={{
              cursor: "pointer",
            }}
          >
            <ThumbDownAltOutlined
              onClick={() => dislike(props.id.toString())}
              className="react-icon"
              fontSize="large"
              style={{ color: "white" }}
            />
          </button>
        )}
        <button className="answer">
          <AnswerModal
            text={text}
            setText={setText}
            postId={props.id}
            isUniv={false}
            id={props.postedBy._id}
          />
        </button>

        <div className="count">
          <b>{props.likes.length - props.dislikes.length}</b>
        </div>
      </div>
    </div>
  );
}
