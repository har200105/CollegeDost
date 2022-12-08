import React from "react";
import ReactModal from "react-modal";
import "./styles.css";
import "./Que.css";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";

class CommentModal extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <div>
        <button onClick={this.handleOpenModal} className="modal-btn">
          <ChatBubbleOutlineOutlinedIcon
            className="react-icon"
            fontSize="large"
            style={{ color: "black" }}
          />
        </button>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="onRequestClose Example"
          onRequestClose={this.handleCloseModal}
          shouldCloseOnOverlayClick={true}
        >
          <p>
            Comment
            <textarea
              rows="8"
              cols="70"
              className="text-areas onett"
            ></textarea>
          </p>

          <button onClick={this.handleCloseModal} className="close1">Close</button>
        </ReactModal>
      </div>
    );
  }
}

const props = {};

export default CommentModal;
