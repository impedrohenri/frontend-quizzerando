import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

export default function OffCanvas(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  // Lida com a existencia de dois componentes de filtragem
  const [clone, setClone] = useState(false);

  const handleEntering = () => {
    const del = document.getElementById('asideFilter');
    setClone(del.cloneNode(true))
    del.remove()
  }

  const handleExiting = () => {
    const aside = document.getElementById('asideDiv')
    aside.appendChild(clone)
  }


  return (
    <>
      <Button variant="outline-primary" onClick={handleShow} className={`d-xl-none rounded-pill fw-medium ${props.className}`}>
        {props.button}
      </Button>

      <Offcanvas show={show} onHide={handleClose} placement='end' scroll restoreFocus={false} className='rounded-start-4' onEntering={handleEntering} onExiting={handleExiting}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{props.titulo}</Offcanvas.Title>
        </Offcanvas.Header>
        <hr className="my-0 py-0" />
        <Offcanvas.Body className='d-flex flex-column px-0'>
          {props.children}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}