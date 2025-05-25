import { Container, Spinner } from "react-bootstrap";

export default function Loading() {


    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Carregando...</span>
            </Spinner>
        </Container>
    )
}