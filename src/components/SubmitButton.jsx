import { Button } from "react-bootstrap";

export default function SubmitButton({value, ...props} ){

    return (
        <>
        <Button variant='primary' type='submit' {...props}>{value}</Button>
        </>
    )
}