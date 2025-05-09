import { Button, Card, Container, Row } from "react-bootstrap";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import categorias from '../../data/categorias.json'
import quizzes from '../../data/quizzes.json'

export default function IniciarQuiz(){
    const navigate = useNavigate();
    const quiz = quizzes[3]

    const handleInit = () => {
        navigate(`/quiz/${quiz.id}/pergunta/${quiz.id}`)
    }

    return (
        <>
        <Header/>

        <Container className="mt-4">
            <Card className="col-11 col-sm-9 col-md-8 col-lg-6 p-4 mx-auto row-gap-4">
                <h4>{quiz.titulo}</h4>
                <Row>
                    <div className="col-2"><i className={`${categorias[quiz.categoria]}`}></i></div>
                    <p className="col-10">{quiz.descricao}</p>
                </Row>
                <h6>Categoria: <span>{quiz.categoria}</span></h6>
                
                <span className="text-black-50">Observação: caso seja desconectado antes de finalizar o quiz, todo o progresso será perdido.</span>

                <Button className="rounded-pill mx-auto fw-semibold mt-4" onClick={handleInit}>Iniciar quiz</Button>
            </Card>
        </Container>
        </>
    )
}