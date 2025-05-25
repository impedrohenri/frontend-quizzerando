import { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { AuthContext } from "../contexts/AuthContexts";
import API_URL from "../API.route";
import { Card, Col, Container, ProgressBar, Row } from "react-bootstrap";
import Loading from "../components/Loading/Loading";
import CardHistorico from "../components/CardHistorico/CardHistorico";

export default function HistoricoQuizzes() {
    const { token, userId } = useContext(AuthContext)
    const [historico, setHistorico] = useState('')
    const [load, setLoad] = useState(false);

    const mediaAcertos = 50; // Média de acertos em porcentagem
    const quizzesRespondidos = 45; // Total de quizzes respondidos
    const questoesRespondidas = 876; // Total de questões respondidas
    const questoesCertas = 687; // Total de questões certas
    const questoesErradas = 189; // Total de questões erradas

    useEffect(() => {
        setLoad(true)
        fetch(`${API_URL}/usuario/${userId}/resultados`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res =>{ return res.json()})
            .then(res => {
                setHistorico(res);
            })
            .catch(error => console.error(error))
            .finally(() => setLoad(false));
    }, [userId, token]);

    return (
        <>
            <Header />

            {load && <Loading />}
            
            <Container className="d-flex flex-column row-gap-4">
                {historico.length > 0 && (
                        historico.map((quiz, index) => (
                            <CardHistorico 
                                key={index} 
                                historicoQuiz={quiz} 
                            />
                        ))
                    )}
            </Container>
        </>
    )
}