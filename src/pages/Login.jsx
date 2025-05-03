import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import SubmitButton from "../components/SubmitButton";
import Form from 'react-bootstrap/Form';
import LogoSideLayer from '../components/LogoSideLayer/LogoSideLayer';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


export default function Login() {
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        setValidated(true);
        navigate('/')
    };

    return (
        <div className='d-flex flex-wrap vh-100 align-items-stretch w-100'>
            <LogoSideLayer />


            <div className="form-login-senha col-12 col-md-7 d-flex flex-column align-items-center justify-content-center ">

                <Card style={{ width: '23rem' }} className='p-4 bg-light border-light-subtle rounded-4'>
                    <h4 className='text-center'>Realizar login</h4>

                    <Form id='formLogin' noValidate validated={validated} onSubmit={handleSubmit} >
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email </Form.Label>
                            <Form.Control name="email" type="email" placeholder="Digite o seu email" required />

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control name='password' type="password" placeholder="Digite sua senha" required />
                        </Form.Group>

                        <div className="d-flex justify-content-between align-items-bottom mt-4 pt-4">
                            <Link to='/esqueceu-senha' className='mt-auto'><span>Esqueceu a senha?</span></Link>

                            <SubmitButton value='Entrar' />
                        </div>
                    </Form>
                </Card>
                <p className='text-center mt-4'>Ainda não possui uma conta? <Link to='/cadastro'>Clique aqui</Link> para se cadastrar</p>



            </div>
        </div>
    )
}