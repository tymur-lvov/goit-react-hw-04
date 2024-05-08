import Modal from "react-modal";

const customStyles = {
  overlay: {
    backgroundColor: "#575757",
  },
  content: {
    height: 750,
    width: 1750,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: 0,
    border: "none",
    borderRadius: 0,
  },
};

Modal.setAppElement("#root");

function ImageModal({ modalIsOpen, onRequestClose, modalImg, onClick }) {
  return (
    <div onClick={onClick}>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={onRequestClose}
        style={customStyles}
      >
        <img src={modalImg.url} alt={modalImg.alt} />
      </Modal>
    </div>
  );
}

export default ImageModal;
