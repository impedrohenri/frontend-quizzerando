import styles from './QuizCard.module.css'
import { Card, Button, Modal } from "react-bootstrap";
import categorias from '../../data/categorias.json'
import { Link } from 'react-router-dom';

import API_URL from '../../API.route';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContexts';

export default function QuizCard({ quiz, setQuizzes, quizzes }) {
    const categoria = categorias[quiz.categoria]
    const {token, role} = useContext(AuthContext)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDelete = () => {
        fetch(API_URL + '/quizz/del/' + quiz.id, {
            method: 'DELETE',
            headers:{
				'Authorization': `Bearer ${token}`
			}
        })
        setQuizzes(quizzes.filter(objeto => objeto.id !== quiz.id))
        handleClose()

    }

    return (
        <div className="col-12 col-sm-6 col-lg-4 px-2">
            <Card className="rounded-4">
                <Card.Header as="h6" className="text-truncate rounded-top-4 position-relative pe-4">{quiz.titulo}
                    {role==='admin' && <div onClick={handleShow}>
                        <i className='fa fa-trash position-absolute top-50 end-0 translate-middle-y me-2'></i>
                    </div>}
                </Card.Header>
                <Card.Body className='d-flex flex-wrap justify-content-between row-gap-4 bg-color-danger'>
                    <div className='col-3'><i className={categoria}></i></div>
                    <Card.Text className={`ps-2 col-9 ${styles.text_truncate}`}>
                        {quiz.descricao}
                    </Card.Text>
                    <span>
                        <span className='border fs-7 rounded-pill px-2'>{quiz.categoria}</span>
                    </span>
                    <Link to={`/quiz/${quiz.id}`}><Button variant="primary" className='rounded-pill py-1'>Responder</Button></Link>
                </Card.Body>
            </Card>

            {/* Modal de deleção */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className='fs-5'>Deletar quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Deseja mesmo deletar esse quiz?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleDelete}>
                        Confirmar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}