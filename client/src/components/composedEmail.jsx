import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import ComposedForm from "../common/composedForm";

class ComposedEmail extends Component {
  state = {
    show: false
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <button
            type="button"
            className="btn btn-light"
            onClick={this.handleShow}
            style={{
              padding: "15px",
              backgroundColor: "whitesmoke",
              text: "blod",
              fontWeight: "bold"
            }}
          >
            Composed
          </button>
        </div>
        <div>
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Composed</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ComposedForm />
            </Modal.Body>
          </Modal>
        </div>
      </React.Fragment>
    );
  }
}

export default ComposedEmail;
