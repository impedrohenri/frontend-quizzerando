import { Button, Card, Container, Form} from "react-bootstrap";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import perguntas from '../../data/perguntas.json'
import quizzes from '../../data/quizzes.json'

export default function PerguntasQuiz() {
    const navigate = useNavigate();
    const pergunta = perguntas[0];
    const quiz = quizzes[0]

    const handleNext = () => {
        navigate(`/quiz/${quiz.id}/resultado`)
    }
    return (
        <>
            <Header />

            <Container className="mt-4">
                <Card className="col-11 col-sm-9 col-md-8 col-lg-6 p-4 mx-auto row-gap-4">
                    <h5>{pergunta.id_pergunta}. {pergunta.enunciado}</h5>


                    <div className="ps-4">
                        {<Form.Check type="radio" name="alt" id="alternativa1" label={pergunta.alternativa1} />}
                        {pergunta.alternativa2 && <Form.Check type="radio" name="alt" id="alternativa2"  label={`${pergunta.alternativa2}`} />}
                        {pergunta.alternativa3 && <Form.Check type="radio" name="alt" id="alternativa3" label={`${pergunta.alternativa3}`} />}
                        {pergunta.alternativa4 && <Form.Check type="radio" name="alt" id="alternativa4" label={`${pergunta.alternativa4}`} />}
                        {<Form.Check type="radio" name="alt" id="alternativa5" label={pergunta.respCorreta} />}
                    </div>

                    <hr className="py-0 my-0 mt-4"/>

                    <div className="d-flex justify-content-between">
                        <Button variant="outline-secondary" className="rounded-pill">Voltar</Button>
                        <Button variant="primary" className="rounded-pill" onClick={handleNext}>Próxima</Button>
                    </div>

                </Card>
            </Container>
        </>
    )
}