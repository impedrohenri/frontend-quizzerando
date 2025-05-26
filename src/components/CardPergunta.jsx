import { Card } from "react-bootstrap";

export default function CardPergunta({ index, pergunta, perguntasCad, setPerguntasCad, setPerguntasToDelete }) {

    const handleDelete = () => {
        setPerguntasCad(perguntasCad.filter(p => p !== pergunta));
        
        if (typeof setPerguntasToDelete === 'function') {
            setPerguntasToDelete(prev => prev.filter(p => p !== pergunta));
        }
    }

    return (
        <Card key={index} className="p-2 my-2 col-11 mx-auto">
            <div className="d-flex">
                <h6>Pergunta {index + 1}</h6>
                <i className="fa fa-trash text-danger ms-auto" onClick={handleDelete} style={{ cursor: 'pointer' }}></i>
            </div>
            <span>{pergunta.enunciado}</span>
            <span className="text-success"><i className="fa fa-check"></i> {pergunta.respCorreta}</span>
            <span className="text-danger"><i className="fa fa-times"></i> {pergunta.alternativa1}</span>
            {pergunta.alternativa2 && <span className="text-danger"><i className="fa fa-times"></i> {pergunta.alternativa2}</span>}
            {pergunta.alternativa3 && <span className="text-danger"><i className="fa fa-times"></i> {pergunta.alternativa3}</span>}
            {pergunta.alternativa4 && <span className="text-danger"><i className="fa fa-times"></i> {pergunta.alternativa4}</span>}
        </Card>
    )
}