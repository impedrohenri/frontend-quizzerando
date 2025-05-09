import { Button, Card, Container, Form, Row } from "react-bootstrap";
import Header from "../../components/Header";
import { useState } from "react";
import ModalEstatico from '../../components/Modais/ModalEstatico'
import { useNavigate } from "react-router-dom";
import CardQuestao from "../../components/CardQuestao";

export default function CriarQuiz() {
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const [questoesCad, setQuestoesCad] = useState([]);


    const [qntdIncorretas, setQntdIncorretas] = useState(0)
    const inputIncorretas = [];
    const mapIncorretas = () => {
        for (let i = 0; i < qntdIncorretas; i++) {
            inputIncorretas.push(
                <Form.Group className="d-flex align-items-center gap-2 mb-3 text-danger fs-5">
                    <Form.Label>{i + 3}.</Form.Label>
                    <Form.Control type="text" name={`alternativaIncorreta${i + 2}`} placeholder="Informe uma alternativa incorreta" className="border-2 border-danger rounded-pill" required />
                    <i className="fa fa-trash"></i>
                </Form.Group>
            );
        }
        return inputIncorretas
    }

    const handleCadastro = (event) => {
        event.preventDefault()
        const formData = new FormData(document.getElementById('formCadastro'))
        const data = Object.fromEntries(formData)

        setQuestoesCad([...questoesCad, data])
        setValidated(true);
    }

    const handleSave = () => {
        navigate('/')
    }

    return (
        <>
            <Header />
            <Container className="col-11 col-md-10 mx-auto my-4 py-4">
                <h2>Criar Quiz</h2>
                <p>Adicione perguntas e respostas ao seu quiz e em seguida salve-o.</p>
            </Container>
            <Container fluid className="mb-4">
                <Row>
                    <Card className="col-11 col-sm-10 col-md-8 col-lg-7 col-xl-6 mx-auto p-4 order-1">
                        <h5>Quiz</h5>
                        <hr />
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Título do quiz</Form.Label>
                                <Form.Control type="text" name="titulo" placeholder="Adicione um titulo" required />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Descrição do quiz</Form.Label>
                                <Form.Control as="textarea" name="descricao" rows={3} required />
                            </Form.Group>
                        </Form>

                        <ModalEstatico 
                            value={<><i className='fa fa-plus'> </i> Adicionar questão</>} 
                            titulo='Adicionar Questão'
                            formId='formCadastro'
                         >
                            <Form onSubmit={handleCadastro} id='formCadastro' noValidate validated={validated} >
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-medium">Insira o enunciado da questão</Form.Label>
                                    <Form.Control as="textarea" name="enunciado" rows={4} required autoFocus />
                                </Form.Group>

                                <h5>Alternativa correta</h5>
                                <Form.Group className="d-flex align-items-center gap-2 mb-3 text-success fs-5">
                                    <Form.Label>1.</Form.Label>
                                    <Form.Control type="text" name="alternativaCorreta" placeholder="Informe a alternativa correta" className="border-2 border-success rounded-pill" required />
                                </Form.Group>

                                <hr className="my-4" />

                                <h5>Alternativa incorreta</h5>
                                <Form.Group className="d-flex align-items-center gap-2 mb-3 text-danger fs-5">
                                    <Form.Label>2.</Form.Label>
                                    <Form.Control type="text" name="alternativaIncorreta1" placeholder="Informe uma alternativa incorreta" className="border-2 border-danger rounded-pill" required />
                                    <i className="fa fa-trash"></i>
                                </Form.Group>

                                {mapIncorretas()}

                                {qntdIncorretas > 2 && (<span className="text-danger">Limite máximo de alternativas atingido</span>)}

                                <Row>
                                    <Button variant="outline-danger" onClick={() => { setQntdIncorretas(qntdIncorretas + 1) }} className='rounded-pill fw-medium mt-4 mx-auto col-6' disabled={qntdIncorretas > 2} >
                                        <i className="fa fa-plus"></i> Alternativa incorreta
                                    </Button>
                                </Row>
                            </Form>

                        </ModalEstatico>

                        <ModalEstatico value='Criar' titulo='Confirmar salvamento' handleSave={handleSave}>
                            <h6>Deseja salvar o quiz?  </h6>
                            <span>Clique em 'Salvar' e você será redirecionado a tela principal</span>
                        </ModalEstatico>

                    </Card>

                    <Card className="col-11 col-sm-10 col-md-8 col-lg-4 col-xl- mx-auto p-4 order-2">
                        <h5 className="">Questões</h5>
                        <hr className="mb-4" />

                        <div className="mx-auto col-12" style={{ overflowY: 'scroll', maxHeight: '400px' }}>
                            {questoesCad.length > 0 &&
                                questoesCad.map((questao, index) => (
                                    <CardQuestao questao={questao} index={index} />
                                ))
                            }
                        </div>
                    </Card>
                </Row>
            </Container>
        </>
    )
}