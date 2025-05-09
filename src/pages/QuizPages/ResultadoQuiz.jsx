import { Link } from "react-router-dom";
import Header from "../../components/Header";
import { Button } from "react-bootstrap";

export default function ResultadoQuiz() {
    return (
        <>
            <Header />

            <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
                <div className="p-4 bg-primary border-light-subtle rounded-4" style={{ width: '23rem' }}>
                    <h1 style={{color:'white'}}>Resultado:</h1>
                    <h1 style={{ fontSize: '8.0rem', marginTop: '50px' ,color:'white'}}>11/20</h1>
                </div>

                <div className="p-4 rounded-4 mt-4" style={{ width: '23rem' }}>
                    <Link to="/quiz/{:id}">
                    <Button className="w-100" variant="primary">Tentar Novamente</Button>
                    </Link>
                    <Link to="/">
                    <Button className="w-100 mt-3" variant="secondary">Sair</Button>
                    </Link>
                </div>
            </div>

        </>
    );
}
