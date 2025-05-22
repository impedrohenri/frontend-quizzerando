import { Button, Card, Form } from "react-bootstrap";
import LogoSideLayer from "../components/LogoSideLayer/LogoSideLayer";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SubmitButton from "../components/Buttons/SubmitButton";
import API_URL from "../API.route";

export default function Cadastro() {
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState('')
    
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        
        if (!form.checkValidity()) {
            event.stopPropagation();
            setValidated(true);
            return;
        }

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

    
        if ((data.senha !== data.confirmar) && (data.confirmar >= 8)) {
            setPasswordMatch('As senhas não coincidem!')
            return;
        }

        fetch(API_URL + "/usuario/register", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then((res) => {
                if (res.status === 201) {
                    navigate('/login');
                } else if (res.status === 500) {
                    alert("erro:" + res.status);
                }
            });
    };

    return (
        <div className='d-flex flex-wrap vh-100 align-items-stretch w-100'>
            <LogoSideLayer />

            <div id="form-cadastro" className="form-cadastro col-12 col-md-7 d-flex align-items-center justify-content-center ">
                <Card style={{ width: '23rem' }} className='p-4 bg-light border-light-subtle rounded-4'>
                    <h4 className='text-center'>Cadastre-se</h4>

                    <Form id='formCadastro' noValidate validated={validated} onSubmit={handleSubmit} >

                        <Form.Group className="mb-3" controlId="formBasicNome">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control 
                                name="nome" 
                                type="text" 
                                placeholder="Digite o seu nome" 
                                minLength={5} 
                                required 
                            />
                            <Form.Control.Feedback type="invalid">
                                Por favor, digite um nome válido (mínimo 5 caracteres).
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                                name="email" 
                                type="email" 
                                placeholder="Digite o seu email" 
                                required 
                            />
                            <Form.Control.Feedback type="invalid">
                                Por favor, digite um email válido.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control 
                                name='senha' 
                                type="password" 
                                placeholder="Digite sua senha" 
                                minLength={8} 
                                required
                                onChange={() => {setPasswordMatch('')}}
                            />
                            <Form.Control.Feedback type="invalid">
                                A senha deve ter no mínimo 8 caracteres.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                            <Form.Label>Confirmar senha</Form.Label>
                            <Form.Control 
                                name='confirmar' 
                                type="password" 
                                placeholder="Digite sua senha novamente" 
                                minLength={8} 
                                required
                                onChange={() => {setPasswordMatch('')}}
                            />
                            <Form.Control.Feedback type="invalid">
                                As senhas devem coincidir.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <span className="text-danger py-0 my-0">{passwordMatch}</span>

                        <div className="d-flex justify-content-between mt-2 pt-4">
                            <Link to='/login'>
                                <Button variant="outline-secondary">
                                    Voltar
                                </Button>
                            </Link>

                            <SubmitButton value='Cadastrar' />
                        </div>
                    </Form>
                </Card>
            </div>
        </div>
    )
}