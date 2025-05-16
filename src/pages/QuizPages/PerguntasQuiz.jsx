import { Button, Card, Container, Form } from "react-bootstrap";


export default function PerguntasQuiz({perguntas, pergunta, index, setIndex }) {


    const handleGoBack = () => {
        setIndex(index - 1)
    }

    const handleNext = () => {
        setIndex(index + 1)
    }
    


    return (
        <>

            <Container className="mt-4">
                <Card className="col-11 col-sm-9 col-md-8 col-lg-6 p-4 mx-auto row-gap-4">
                    <h5>{index + 1}. {pergunta.enunciado}</h5>


                    <div className="ps-4">
                        {<Form.Check type="radio" name="alt" id="alternativa1" label={pergunta.alternativa1} />}
                        {pergunta.alternativa2 && <Form.Check type="radio" name="alt" id="alternativa2" label={`${pergunta.alternativa2}`} />}
                        {pergunta.alternativa3 && <Form.Check type="radio" name="alt" id="alternativa3" label={`${pergunta.alternativa3}`} />}
                        {pergunta.alternativa4 && <Form.Check type="radio" name="alt" id="alternativa4" label={`${pergunta.alternativa4}`} />}
                        {<Form.Check type="radio" name="alt" id="alternativa5" label={pergunta.respCorreta} />}
                    </div>

                    <hr className="py-0 my-0 mt-4" />

                    <div className="d-flex justify-content-between">
                        <Button variant="outline-secondary" className="rounded-pill" onClick={handleGoBack} disabled={index===0}>Voltar</Button>
                        
                        <Button variant="primary" className="rounded-pill" onClick={handleNext}>{perguntas.length-1 === index ?"Finalizar":  "Próxima"}</Button>
                    </div>

                </Card>
            </Container>
        </>
    )
}