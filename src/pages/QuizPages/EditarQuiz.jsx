import { Button, Card, Container, Form, Row } from "react-bootstrap";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import ModalEstatico from '../../components/Modais/ModalEstatico'
import CardPergunta from "../../components/CardPergunta";
import API_URL from "../../API.route";
import quizCategorias from '../../data/categorias.json'
import AlternativaIncorreta from "../../components/AlternativaIncorreta/AlternativaIncorreta";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContexts";
import Loading from "../../components/Loading/Loading";

export default function EditarQuiz() {
    const [load, setLoad] = useState(false)
    const [validated, setValidated] = useState(false);
    const [quizFormValidated, setQuizFormValidated] = useState(false);
    const [perguntasCad, setPerguntasCad] = useState([]);
    const [categorias, setCategorias] = useState([])
    const [altsIncorretas, setAltsIncorretas] = useState([]);
    const [showPerguntas, setShowPerguntas] = useState(false);
    const [showConfirmacao, setShowConfirmacao] = useState(false);
    const { quizId } = useParams()
    const { userId, token } = useContext(AuthContext)
    const navigate = useNavigate()
    const [perguntasToDelete, setPerguntasToDelete] = useState([])
    const [quizToEdit, setQuizToEdit] = useState({})
    const [categoriaInicial, setCategoriaInicial] = useState([])


    useEffect(() => {
        setCategorias(quizCategorias)
        setLoad(true)
        // req do quiz
        fetch(`${API_URL}/quizz/${quizId}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
            .then(res => { return res.json() })
            .then(res => { setQuizToEdit(res); setCategoriaInicial(res.categoria) })

        // req das perguntas do quiz
        fetch(`${API_URL}/quizz/${quizId}/perguntas`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
            .then(res => { return res.json() })
            .then(res => { setPerguntasCad(res); setPerguntasToDelete(res); setLoad(false) })

    }, [token, quizId])



    const handleAddIconrretas = () => {
        if (altsIncorretas.length < 3) {
            setAltsIncorretas([...altsIncorretas, { id: Date.now() }]);
        }
    }


    const handleCadastroPerguntas = (event) => {
        event.preventDefault();
        const formData = new FormData(document.getElementById('formCadastroPerguntas'));
        const data = Object.fromEntries(formData);

        const CampoVazio = Object.values(data).some(value => value === '');
        if (CampoVazio) {
            setValidated(true);
            return
        }

        setPerguntasCad([...perguntasCad, data])

        setValidated(false);
        setShowPerguntas(false)
        setAltsIncorretas([]);

    }


    const handleSave = async () => {
        const formData = new FormData(document.getElementById('formCadastroQuiz'));
        const quizData = Object.fromEntries(formData);

        const temCampoVazio = Object.values(quizData).some(value => value === '');
        if (temCampoVazio) {
            setQuizFormValidated(true);
            setShowConfirmacao(false)
            return
        }

        quizData.userId = userId;
        quizData.ativo = true;
        
        setLoad(true)
        try {
            // req do cadastro de quiz
            const res = await fetch(API_URL + "/quizz/edit/" + quizId, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(quizData)
            });

            if (!res.ok) {
                throw new Error('Erro ao cadastrar quiz');
            }

            const novoQuiz = await res.json();
            const quizzId = novoQuiz.id;


            for (const element of perguntasToDelete) {
                const pergunta = {
                    ...element
                };
                
                await fetch(API_URL + "/pergunta/del/" + pergunta.id, {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(pergunta)
                })
            }
            

            for (const element of perguntasCad) {
                const pergunta = {
                    ...element,
                    quizzId: quizzId
                };

                // req dos cadastros das perguntas
                await fetch(API_URL + "/pergunta/cad", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(pergunta)
                })
                .then(() => setLoad(false))
            }

        } catch (err) {
            console.error(err);
        }

        navigate('/')
    };


    return (
        <>
            <Header />

            <Container className="col-11 col-md-10 mx-auto my-4 py-4">
                <h2>Editar Quiz</h2>
                <p>Adicione perguntas e respostas ao seu quiz e em seguida salve-o.</p>
            </Container>


            <Container fluid className="mb-4">
                <Row>
                    <Card className="col-11 col-sm-10 col-md-8 col-lg-7 col-xl-6 mx-auto p-4 order-1 rounded-4 bg-light mb-4">
                        <h5>Quiz</h5>
                        {quizFormValidated && (<span className="text-danger">Preencha todos os campos</span>)}
                        <hr />
                        <Form id="formCadastroQuiz" noValidate validated={quizFormValidated}>

                            <Form.Group className="mb-3">
                                <Form.Label><h6>Título do quiz</h6> </Form.Label>
                                <Form.Control type="text" name="titulo" className="rounded-pill" placeholder="Adicione um titulo" required defaultValue={quizToEdit.titulo} />
                            </Form.Group>


                            <Form.Group className="mb-3">
                                <Form.Label><h6>Descrição do quiz</h6></Form.Label>
                                <Form.Control as="textarea" name="descricao" className="rounded-4" rows={3} required defaultValue={quizToEdit.descricao} />
                            </Form.Group>

                            <h6>Categoria do quiz</h6>
                            <select name="categoria" className="rounded-pill form-select" aria-label="Default select example" required value={categoriaInicial} onChange={(e) => { setCategoriaInicial(e.target.value) }}>
                                <option value="">Selecione uma opção</option>
                                {Object.keys(categorias).map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </Form>


                        <ModalEstatico
                            value={<><i className='fa fa-plus'> </i> Adicionar perguntas</>}
                            titulo='Adicionar Pergunta'
                            formId='formCadastroPerguntas'
                            setAltsIncorretas={setAltsIncorretas}
                            setShow={setShowPerguntas}
                            show={showPerguntas}
                            setValidated={setValidated}
                        >
                            <Form onSubmit={handleCadastroPerguntas} id='formCadastroPerguntas' noValidate validated={validated} >
                                <span id="msgErroPerguntas"></span>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-medium">Insira o enunciado da pergunta</Form.Label>
                                    <Form.Control as="textarea" name="enunciado" rows={4} required autoFocus />
                                </Form.Group>

                                <h5>Alternativa correta</h5>
                                <Form.Group className="d-flex align-items-center gap-2 mb-3 text-success fs-5">
                                    <Form.Label>1.</Form.Label>
                                    <Form.Control type="text" name="respCorreta" placeholder="Informe a alternativa correta" className="border-2 border-success rounded-pill" required />
                                </Form.Group>

                                <hr className="my-4" />

                                <h5>Alternativa incorreta</h5>
                                <Form.Group className="d-flex align-items-center gap-2 mb-3 text-danger fs-5">
                                    <Form.Label>2.</Form.Label>
                                    <Form.Control type="text" name="alternativa1" placeholder="Informe uma alternativa incorreta" className="border-2 border-danger rounded-pill" required />
                                </Form.Group>

                                {
                                    altsIncorretas.map((alt, index) => (
                                        <AlternativaIncorreta
                                            key={alt.id}
                                            i={index}
                                            onRemove={() => {
                                                setAltsIncorretas(altsIncorretas.filter((_, i) => i !== index));
                                            }}
                                        />

                                    ))
                                }

                                {altsIncorretas.length > 2 && (<span className="text-danger">Limite máximo de alternativas atingido</span>)}

                                <Row>
                                    <Button
                                        onClick={handleAddIconrretas}
                                        disabled={altsIncorretas.length >= 3}
                                        className='rounded-pill fw-medium mt-4 mx-auto col-6'
                                    >
                                        <i className="fa fa-plus"></i> Alternativa incorreta
                                    </Button>
                                </Row>

                            </Form>
                        </ModalEstatico>


                        <ModalEstatico disabled={perguntasCad.length === 0}
                            value='Editar'
                            titulo='Confirmar edição'
                            onClick={handleSave}
                            show={showConfirmacao}
                            setShow={setShowConfirmacao}
                        >
                            {load === true ? <Loading/> : (<div>
                                <h6>Deseja editar o quiz?  </h6>
                            <span>Clique em 'Salvar' e você será redirecionado a tela principal</span>
                            </div>)}
                        </ModalEstatico>
                        {perguntasCad.length === 0 && <span className="mx-auto text-black-50">Você precisa cadastrar ao menos um pergunta para Editar o quiz.</span>}
                    </Card>


                    <Card className="col-11 col-sm-10 col-md-8 col-lg-4 col-xl- mx-auto p-4 order-2 rounded-4 bg-light">
                        <h5 className="">Perguntas</h5>
                        <hr className="mb-4" />

                        <div className="mx-auto col-12" style={{ overflowY: 'scroll', maxHeight: '400px' }}>
                            {perguntasCad.length > 0 &&
                                perguntasCad.map((pergunta, index) => (
                                    <CardPergunta pergunta={pergunta} index={index} perguntasCad={perguntasCad} setPerguntasCad={setPerguntasCad} />
                                ))
                            }
                        </div>
                    </Card>
                </Row>
            </Container >
            {load === true && <Loading className='position-absolute top-50 start-50 translate-middle'/>}
        </>
    )
}