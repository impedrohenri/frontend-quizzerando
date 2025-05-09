import { Card, Container, Form, Row } from "react-bootstrap";
import Header from "../../components/Header";

export default function CriarQuiz() {

    return (
        <>
            <Header />
            <Container className="col-11 col-md-10 mx-auto my-4 py-4">
                <h2>Criar Quiz</h2>
                <p>Adicione perguntas e respostas ao seu quiz e em seguida salve-o.</p>
            </Container>
            <Container fluid >
                <Row>
                    <Card className="col-11 col-sm-10 col-md-8 col-lg-7 col-xl-6 mx-auto p-4 order-1">
                        <h5>Quiz</h5>
                        <hr />
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Título</Form.Label>
                                <Form.Control type="email" placeholder="Adicione um titulo" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Descrição</Form.Label>
                                <Form.Control as="textarea" rows={3} />
                            </Form.Group>
                        </Form>
                    </Card>

                    <Card className="col-11 col-sm-10 col-md-8 col-lg-4 col-xl- mx-auto p-4 order-2">
                        <h5 className="">Questões</h5>
                        <hr className="mb-4" />
                        <Card>

                        </Card>
                    </Card>
                </Row>
            </Container>
        </>
    )
}