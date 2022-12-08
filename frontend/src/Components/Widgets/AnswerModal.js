import React, { useState ,useEffect} from "react";
import ReactModal from "react-modal";
import "../Screens/styles.css";
import '../Screens/Que.css';
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import axios from "axios";
import { API } from "./API";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const AnswerModal = (props) => {

  const [showModal, setShowModal] = useState(false);
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
        headers: {Authorization: "CollegeDost " + localStorage.getItem("jwt")}});

    if (comment) {
      handleClick();
      window.location.reload()
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
          Authorization: "CollegeDost " + localStorage.getItem("jwt"),
        },
      }
    );

    if (comment) {

      handleClick();
      window.location.reload()
      props.setText("");
      setShowModal(false);
    }
  };
  // this.handleOpenModal = this.handleOpenModal.bind(this);
  // this.handleCloseModal = this.handleCloseModal.bind(this);
  // handleOpenModal() {
  //   this.setState({ showModal: true });
  // }
  // handleCloseModal() {
  //   this.setState({ showModal: false });
  // }
  // handleText(s){
  //   this.setState({text:s})
  // }

  return (
    <div>
      <button onClick={() => setShowModal(true)} className="modal-btn">
        <QuestionAnswerIcon
          className="react-icon"
          fontSize="large"
          style={{ color: "white" }}
        />
      </button>

      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="info">
            Comment Added
          </Alert>
        </Snackbar>

        <Snackbar open={opend} autoHideDuration={3000} onClose={handleClosed}>
          <Alert onClose={handleClosed} severity="info">
            Adding Comment
          </Alert>
        </Snackbar>


      <ReactModal
        style={{
        }}
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
