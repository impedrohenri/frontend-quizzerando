import { Card } from "react-bootstrap";

export default function CardQuestao({index, questao}) {

    return (
        <Card key={index} className="p-2 my-2 col-11 mx-auto">
            <div className="d-flex"><h6>Questão {index + 1}</h6> <i className="fa fa-trash ms-auto text-danger"></i></div>
            <span>{questao.enunciado}</span>
            <span className="text-success"><i className="fa fa-check"></i> {questao.alternativaCorreta}</span>
            <span className="text-danger"><i className="fa fa-times"></i> {questao.alternativaIncorreta1}</span>
            {questao.alternativaIncorreta2 && <span className="text-danger"><i className="fa fa-times"></i> {questao.alternativaIncorreta2}</span>}
            {questao.alternativaIncorreta3 && <span className="text-danger"><i className="fa fa-times"></i> {questao.alternativaIncorreta3}</span>}
            {questao.alternativaIncorreta4 && <span className="text-danger"><i className="fa fa-times"></i> {questao.alternativaIncorreta4}</span>}
        </Card>
    )
}