import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContexts";

export default function(){
    const {signed} = useContext(AuthContext)

    return signed ? <Outlet/>: <Navigate to='/login' replace/>
}