import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


export default function Login() {

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(document.getElementById('formLogin'));
        const data = Object.fromEntries(formData);

        fetch('https://crudcrud.com/api/d224782836a34d989f53f30ea09bc2f4', {
            method: 'POST',
            body: data
        })

    }

    return (
        <div className='d-flex align-itens-center justify-content-center'>
            <div className="d-flex align-items-center justify-content-center col-6 bg-primary vh-100">
                <div>
                    <img src='./logo.png' alt="logo" height={500} width={500} />
                </div>
            </div>
            <div className="form-login-senha col-6 d-flex align-items-center justify-content-center">

            <Card style={{ width: '23rem' }} className='p-4'>
                <Form id='formLogin'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email </Form.Label>
                        <Form.Control name="email" type="email" placeholder="Digite o seu email" />

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control name='password' type="password" placeholder="Digite sua senha" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <Button variant="primary" className='mx-auto' type="submit">
                        Entrar
                    </Button>
                </Form>
            </Card>
                
                    
             

            </div>
        </div>
    )
}