import { Button, Card, Container, Row } from "react-bootstrap";
import Header from "../../components/Header";
import categorias from '../../data/categorias.json'
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API_URL from "../../API.route";
import PerguntasQuiz from "../../components/PerguntaQuiz/PerguntasQuiz";
import ResultadoQuiz from "../../components/ResultadoQuiz/ResultadoQuiz"
import { AuthContext } from "../../contexts/AuthContexts";
import Loading from "../../components/Loading/Loading";

export default function IniciarQuiz() {
    const { id } = useParams();
    const [load, setLoad] = useState(false);
    const [quiz, setQuiz] = useState([]);
    const [perguntas, setPerguntas] = useState([]);
    const [showInit, setShowInit] = useState('');
    const [index, setIndex] = useState(0);
    const [corretas, setCorretas] = useState(0);
    const [selecionadas, setSelecionadas] = useState([]);
    const { token } = useContext(AuthContext)

    useEffect(() => {
        setLoad(true)
        fetch(`${API_URL}/quizz/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(resp => setQuiz(resp))
            .then(() => setLoad(false))



    }, [id, token])

    const handleInit = () => {
        setShowInit('d-none')


        if (perguntas.length === 0) {
            setLoad(true)
        }

        fetch(`${API_URL}/quizz/${id}/perguntas`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(resp => { setPerguntas(resp); setLoad(false) })
    }


    let componenteRenderizado = null;
    if (showInit === 'd-none') {
        if (index < perguntas.length) {
            componenteRenderizado = (
                <PerguntasQuiz
                    pergunta={perguntas[index]}
                    index={index}
                    setIndex={setIndex}
                    perguntas={perguntas}
                    corretas={corretas}
                    setCorretas={setCorretas}
                    selecionadas={selecionadas}
                    setSelecionadas={setSelecionadas}
                />
            );
        } else {
            componenteRenderizado = (
                <ResultadoQuiz
                    setShowInit={setShowInit}
                    setIndex={setIndex}
                    corretas={corretas}
                    setCorretas={setCorretas}
                    selecionadas={selecionadas}
                    setSelecionadas={setSelecionadas}
                    perguntas={perguntas}
                />)
        }
    }

    return (
        <>
            <Header className='fixed-top' />


            <Container className="mt-4">
                {load ? <Loading /> :
                    <Card className={`col-11 col-sm-9 col-md-8 col-lg-6 p-4 mx-auto row-gap-4 ${showInit}`}>
                        <h4>{quiz.titulo}</h4>
                        <Row className="d-flex justify-content-between">
                            <div className="col-2"><i className={`${categorias[quiz.categoria]}`}></i></div>
                            <p className="col-9 col-md-10">{quiz.descricao}</p>
                        </Row>
                        <h6>Categoria: <span>{quiz.categoria}</span></h6>

                        <span className="text-black-50">Observação: caso seja desconectado antes de finalizar o quiz, todo o progresso será perdido.</span>

                        <Button className="rounded-pill mx-auto fw-semibold mt-4" onClick={handleInit}>Iniciar quiz</Button>
                    </Card>
                }

                {!load && componenteRenderizado}
            </Container>
        </>
    )
}