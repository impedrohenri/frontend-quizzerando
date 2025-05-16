import { Link, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function ResultadoQuiz({setShowInit, setIndex}) {

    const {id} = useParams()

    return (
        <>

            <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
                <div className="p-4 bg-primary border-light-subtle rounded-4" style={{ width: '23rem' }}>
                    <h1 style={{color:'white'}}>Resultado:</h1>
                    <h1 style={{ fontSize: '8.0rem', marginTop: '50px' ,color:'white'}}>/</h1>
                </div>

                <div className="p-4 rounded-4 mt-4" style={{ width: '23rem' }}>
                    
                    <Button className="w-100" variant="primary" onClick={() => {setShowInit(''); setIndex(0)}}>Tentar Novamente</Button>
                    
                    <Link to="/">
                    <Button className="w-100 mt-3" variant="secondary">Sair</Button>
                    </Link>
                </div>
            </div>

        </>
    );
}
