import styles from './CardHistorico.module.css'
import { useContext, useEffect, useState } from "react";
import { Accordion, Card } from "react-bootstrap";
import API_URL from "../../API.route";
import categorias from '../../data/categorias.json'
import { AuthContext } from "../../contexts/AuthContexts";

export default function CardHistorico({ historicoQuiz, key }) {
    const { token } = useContext(AuthContext)
    const [quiz, setQuiz] = useState({})
    const categoria = categorias[quiz.categoria]

    useEffect(() => {
        fetch(`${API_URL}/quizz/${historicoQuiz.quizzId}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
            .then((res) => { return res.json() })
            .then((res) => setQuiz(res))

        console.log(">>>>>>>", quiz)
    }, [])

    return (
        <>
            <Accordion alwaysOpen className={`col-8 ${styles.customAccordion}`}>
                <Accordion.Item eventKey={quiz.id} className={`rounded-4 ${styles.accordionItem}`}>
                    <Accordion.Header className={`rounded-4 ${styles.accordionHeader}`}>
                        <span className={styles.accordionTitle} row={1} col={1}>
                            <i className={categoria}></i>
                        </span>
                        <div className='d-flex flex-column ps-3'>
                            <span className='row-1 fw-bold'>{quiz.titulo}</span>
                            <span className={`row-1 col-8 ${styles.quiz_descricao}`} >{quiz.descricao} Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate alias aliquid perspiciatis? Doloribus nulla delectus voluptates, debitis asperiores iusto, veritatis recusandae placeat in ipsam eos voluptatibus quos velit, excepturi nihil?</span>
                        </div>
                        <div className='d-flex flex-column'>
                            <span className='mx-auto'>Score:</span>
                            <span className={`mx-4 fs-4 fw-bold ${historicoQuiz.pontuacao >= 80 ? 'text-success': historicoQuiz.pontuacao >= 50 ? 'text-warning': 'text-danger' }`}>{(historicoQuiz.pontuacao).toFixed(2)}</span>
                        </div>
                    </Accordion.Header>
                    <Accordion.Body className={styles.accordionBody}>
                        {/* Seu conteúdo aqui */}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

        </>
    )
}