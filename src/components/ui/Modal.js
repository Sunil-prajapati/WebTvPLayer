import React from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";
import "../../styles/component/modal.scss";

export default function CustomModal({ modalIsOpen, children }) {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "100%",
      maxWidth: "890px",
      maxHeight: "478px",
      backgroundColor: "rgba(0, 0, 0, 0.2)",
      border: "6.55376px solid #7B7B7B",
      borderRadius: "13.1075px",
    },
  };

  return (
    <Modal isOpen={modalIsOpen} style={customStyles}>
      {children}
    </Modal>
  );
}
CustomModal.propTypes = {
  modalIsOpen: PropTypes.bool,
  children: PropTypes.any,
};
