import { ListGroup } from "react-bootstrap";
import categorias from '../../data/categorias.json'

export default function Filtragem(props) {

    return (
        <ListGroup id={props.id} className={`rounded-0 rounded-bottom-4 ${props.className}`}>
            {Object.keys(categorias).map((cat, key) => (
                <ListGroup.Item key={key}>
                    <input type="checkbox" className="btn-check" id={cat} autoComplete="off" />
                    <label className="btn btn-outline-secondary w-100 rounded-pill" htmlFor={cat}>{cat}</label>
                </ListGroup.Item>
            ))}
        </ListGroup>
    )
}