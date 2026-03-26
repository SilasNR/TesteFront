import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Confirmacao({ show, titulo, texto, handleClose, deletarM }) {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{titulo}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{texto}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              deletarM();
              handleClose();
            }}
          >
            Deletar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Confirmacao;
