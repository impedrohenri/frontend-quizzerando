import { Button, Modal, Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";



const ModalCentralizado = ({ show, onHide, children }) => {
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);


    useEffect(() => {
        if (!show) {

            setValidated(false)
        }
    }, [show]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const form = document.getElementById('formConteudo');

        if (!form.checkValidity()) {
            setValidated(true);
            form.reportValidity()
            return;
        }

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        if (data.senhaAtual) {
            if (data.novaSenha !== data.confirmeSenha) {
                alert('Confirme a senha corretamente')
                return;
            }
            delete data.confirmeSenha
        }

        console.log(data)

        onHide();
        navigate('/perfil')

    };
    return (

        <Modal show={show} onHide={onHide} centered>
            <Modal.Body>
                <Form id='formConteudo' noValidate validated={validated} >
                    {children}
                    <div className='d-flex justify-content-center mt-3'>
                        <Button onClick={handleSubmit} >Salvar Alteração</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>

    )
}
export default ModalCentralizado;