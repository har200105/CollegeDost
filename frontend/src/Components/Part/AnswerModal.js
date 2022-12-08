import React, { useState ,useEffect} from "react";
import ReactModal from "react-modal";
import "./styles.css";
import "./Que.css";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import axios from "axios";
import { API } from "./API";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { useDispatch } from "react-redux";
import { getAllPosts, getThisUserAllposts, getThisUserUnivposts, getUserposts, getUserUnivposts } from "../../actions/postAction";
import { getCollegePosts } from "../../actions/collegePostAction";

const AnswerModal = (props) => {

  const [showModal, setShowModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [opend, setOpend] = useState(false);
  const [current, setCurrent] = useState([]);

  const dispatch = useDispatch();

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

  useEffect(() => {
    setCurrent();
    setCurrent(JSON.parse(localStorage.getItem("user")));
  }, []);

  const addComment = async () => {
    handleClickd();
    const comment = await axios.put(
      `${API}/maincomment`,
      {
        text: props.text,
        postId: props.postId,
      },
      {
        headers: {
          Authorization:localStorage.getItem("jwt"),
        },
      }
    );

    if (comment) {
      dispatch(getAllPosts());
      dispatch(getThisUserAllposts(props.id));
      dispatch(getThisUserUnivposts(props.id));
      dispatch(getUserposts());
      dispatch(getUserUnivposts());
      handleClick();
      props.setText("");
      setShowModal(false);
    }
  };

  const addCommentUniv = async () => {
    handleClickd();
    const comment = await axios.put(
      `${API}/univcomment`,
      {
        text: props.text,
        postId: props.postId,
      },
      {
        headers: {
          Authorization:localStorage.getItem("jwt"),
        },
      }
    );

    if (comment) {
      dispatch(getCollegePosts());
      handleClick();
      dispatch(getThisUserAllposts(props.id));
      dispatch(getThisUserUnivposts(props.id));
      dispatch(getUserposts());
      dispatch(getUserUnivposts());
      props.setText("");
      setShowModal(false);
    }
  };


  return (
    <div>
      <button onClick={() => setShowModal(true)} className="modal-btn">
        <QuestionAnswerIcon
          className="react-icon"
          fontSize="large"
          style={{ color: "white" }}
        />
      </button>

      <ReactModal
        className="Modal"
        overlayClassName="Overlay"
        isOpen={showModal}
        contentLabel="onRequestClose Example"
        onRequestClose={() => setShowModal(false)}
        shouldCloseOnOverlayClick={true}
      >
        <p>
          Answer
          <textarea
            onChange={(e) => props.setText(e.target.value)}
            value={props.text}
            className="text-areas onett"
          ></textarea>
        </p>

        <button onClick={() => setShowModal(false)} className="close1">
          Close
        </button>

        <button
          onClick={props.isUniv ? addCommentUniv : addComment}
          className="post1"
        >
          Post
        </button>
        <p>{props.comments}</p>
      </ReactModal>
    </div>
  );
};
export default AnswerModal;
