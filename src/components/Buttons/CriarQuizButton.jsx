import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContexts"
import { Button } from "react-bootstrap"

export default function CriarQuizButton() {
    const {role} = useContext(AuthContext)

    return (
        <>
            {role === 'admin' && <Button className="rounded-pill fw-medium">
                <i className="fa fa-plus me-2"></i>Criar Quiz
            </Button>}
        </>
    )
}