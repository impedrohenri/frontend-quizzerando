import styles from './QuizCard.module.css'
import { Card, Button } from "react-bootstrap";
import categorias from '../../data/categorias.json'
import { Link } from 'react-router-dom';

export default function QuizCard({ quiz }) {
    const categoria = categorias[quiz.categoria]

    return (
        <div className="col-12 col-sm-6 col-lg-4 px-2">
            <Card className="rounded-4">
                <Card.Header as="h6" className="text-truncate rounded-top-4">{quiz.titulo}</Card.Header>
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
        </div>
    )
}