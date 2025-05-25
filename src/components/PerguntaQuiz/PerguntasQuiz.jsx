import styles from './PerguntaQuiz.module.css'
import { useContext, useEffect, useState } from 'react';
import { Button, Card, Container, Form, ProgressBar } from "react-bootstrap";
import API_URL from '../../API.route';
import { AuthContext } from '../../contexts/AuthContexts';

export default function PerguntasQuiz({ perguntas, index, setIndex, selecionadas, setSelecionadas, corretas, setCorretas }) {
  const [perguntasComAlternativas, setPerguntasComAlternativas] = useState([]);
  const {token, userId} = useContext(AuthContext)
  const pergunta = perguntasComAlternativas[index];
  const qntdPerguntas = perguntas.length;
  
  // Embaralha uma vez as alternativas assim que o componente monta (ou quando 'perguntas' mudar)
  useEffect(() => {
    function embaralharArray(array) {
      // Fisher-Yates shuffle (mais confiável que sort)
      const arr = [...array];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }

    const perguntasComAlternativasMisturadas = perguntas.map(pergunta => {
      const alternativas = [
        { valor: 'alternativa1', texto: pergunta.alternativa1 },
        pergunta.alternativa2 && { valor: 'alternativa2', texto: pergunta.alternativa2 },
        pergunta.alternativa3 && { valor: 'alternativa3', texto: pergunta.alternativa3 },
        pergunta.alternativa4 && { valor: 'alternativa4', texto: pergunta.alternativa4 },
        { valor: 'respCorreta', texto: pergunta.respCorreta }
      ].filter(Boolean);

      return {
        ...pergunta,
        alternativas: embaralharArray(alternativas),
      };
    });

    setPerguntasComAlternativas(perguntasComAlternativasMisturadas);
  }, [perguntas]);

  if (perguntasComAlternativas.length === 0) return null; // aguardando embaralhar


  const handleGoBack = () => {
    const formData = new FormData(document.getElementById("perguntasForm"));
    const data = Object.fromEntries(formData);

    const novaSelecionada = [...selecionadas];
    novaSelecionada[index] = data.altSelecionada;
    setSelecionadas(novaSelecionada);

    setIndex(index - 1);
  }


  const handleNext = (event) => {
    event.preventDefault();
    const formData = new FormData(document.getElementById("perguntasForm"));
    const data = Object.fromEntries(formData);

    const novaSelecionada = [...selecionadas];
    novaSelecionada[index] = data.altSelecionada;
    setSelecionadas(novaSelecionada);

    setCorretas(novaSelecionada.filter(item => item === 'respCorreta').length);

    setIndex(index + 1);

    document.getElementById("perguntasForm").reset();
  }

  const handleSaveHistory = () => {
    const data = {}

    data.quizzId = perguntas[0].quizzId;
    data.userId = userId;
    data.erros = qntdPerguntas - corretas;
    data.acertos = corretas;
    data.pontuacao = (corretas / qntdPerguntas)*100;


    fetch(`${API_URL}/resultado/cad`, {
      method: 'POST',
      headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
    

  }

  return (
    <Container className={`d-flex flex-column align-items-center mt-4 py-auto ${styles.container}`}>
      <ProgressBar now={((index + 1) / qntdPerguntas) * 100} label={`${index + 1}/${qntdPerguntas}`} className="col-11 col-sm-9 col-md-8 col-lg-6 mb-4 mx-auto my-auto" />
      <Card className="col-11 col-sm-9 col-md-8 col-lg-6 p-4 mx-auto row-gap-4 bg-light rounded-4 mb-auto">
        <h5>{index + 1}. {pergunta.enunciado}</h5>

        <Form id="perguntasForm" onSubmit={handleNext} className="d-flex flex-column ps-4 row-gap-3">
          {pergunta.alternativas.map((alternativa, i) => (
            <Form.Check
              key={i}
              type="radio"
              name="altSelecionada"
              id={`alt${i}`}
              value={alternativa.valor}
              label={alternativa.texto}
              checked={selecionadas[index] === alternativa.valor}
              onChange={(e) => {
                const novaSelecionada = [...selecionadas];
                novaSelecionada[index] = e.target.value;
                setSelecionadas(novaSelecionada);
                setCorretas(novaSelecionada.filter(item => item === 'respCorreta').length);
              }}
            />
          ))}
        </Form>

        <hr className="py-0 my-0 mt-4" />

        <div className="d-flex">
          {index !== 0 && <Button variant="outline-secondary" className="rounded-pill" onClick={handleGoBack}>Voltar</Button>}

          <Button variant="primary" type="submit" form="perguntasForm" className="rounded-pill ms-auto" onClick={qntdPerguntas - 1 === index ? handleSaveHistory : undefined}>{qntdPerguntas - 1 === index ? "Finalizar" : "Próxima"}</Button>
        </div>
      </Card>
    </Container>
  );
}
