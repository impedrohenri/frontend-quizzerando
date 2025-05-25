import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalEstatico({ value, titulo, formId, onClick, children, setAltsIncorretas, show, setShow, setValidated, disabled}) {

  const handleClose = () => {
    setShow(false);
    setAltsIncorretas && setAltsIncorretas([]);
    setValidated && setValidated(false);
  };
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow} className='mx-auto mt-4 px-4 rounded-pill fw-medium' disabled={disabled}>
        {value}
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title>{titulo}</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          {children}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose} className='me-auto'>
            Cancelar
          </Button>
          <Button variant="primary" type='submit' form={formId} onClick={() => {
            if (onClick) onClick();
          }}>Salvar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalEstatico;