import { Form } from "react-bootstrap";

function AlternativaIncorreta({ i, onRemove }) {

    return (
        <>
            <Form.Group className="d-flex align-items-center gap-2 mb-3 text-danger fs-5">
            <Form.Label>{i + 3}.</Form.Label>
            <Form.Control
                type="text"
                name={`alternativa${i + 2}`}
                placeholder="Informe uma alternativa incorreta"
                className="border-2 border-danger rounded-pill"
                required
            />
            <i
                className="fa fa-trash"
                style={{ cursor: 'pointer' }}
                onClick={onRemove}
            ></i>
        </Form.Group>

        </>
    );
}

export default AlternativaIncorreta;
