import { Button, Card, Form } from "react-bootstrap";
import LogoSideLayer from "../components/LogoSideLayer/LogoSideLayer";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SubmitButton from "../components/SubmitButton";

export default function Cadastro() {
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        navigate('/login')
        setValidated(true);
    };

    return (
        <div className='d-flex flex-wrap vh-100 align-items-stretch w-100'>
            <LogoSideLayer />


            <div className="form-cadastro col-12 col-md-7 d-flex align-items-center justify-content-center ">

                <Card style={{ width: '23rem' }} className='p-4 bg-light border-light-subtle rounded-4'>
                    <h4 className='text-center'>Cadastre-se</h4>

                    <Form id='formCadastro' noValidate validated={validated} onSubmit={handleSubmit} >

                        <Form.Group className="mb-3" controlId="formBasicNome">
                            <Form.Label>Nome </Form.Label>
                            <Form.Control name="nome" type="text" placeholder="Digite o seu nome" required />

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email </Form.Label>
                            <Form.Control name="email" type="email" placeholder="Digite o seu email" required />

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control name='password' type="password" placeholder="Digite sua senha" required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Confirmar senha</Form.Label>
                            <Form.Control name='confirmPassword' type="password" placeholder="Confirme sua senha" required />
                        </Form.Group>

                        <div className="d-flex justify-content-between mt-4 pt-4">
                            <Link to='/login'>
                                <Button variant="outline-secondary">
                                    Voltar
                                </Button>
                            </Link>

                            
                                <SubmitButton value='Cadastrar'/>
                            
                        </div>
                    </Form>
                </Card>




            </div>
        </div>
    )
}