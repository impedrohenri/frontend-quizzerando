import { createContext, useEffect, useState } from "react";
import API_URL from "../API.route";
import { useNavigate } from "react-router-dom";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [role, setRole] = useState(localStorage.getItem('role'))
    const [token, setToken] = useState(localStorage.getItem('auth'))
    const navigate = useNavigate()

    useEffect(() => {
            setToken(localStorage.getItem('auth'))
    }, [])


    const signIn = async (data) => {
        const response = await fetch(API_URL + "/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.status === 401) {
            return response.status;
        }

        const responseData = await response.json();

        if (!!responseData.token) {
            let token = responseData.token
            localStorage.setItem('auth', responseData.token)
            localStorage.setItem('role', responseData.role)
            setToken(responseData.token)
            return true
        }
    };

    const signOut = (e) => {
        localStorage.clear()
        setRole(null)
        setToken(null);
        navigate('/login')
    };

    return (
        <AuthContext.Provider value={{ signed: !!token, token, signIn, signOut, role }}>
            {children}
        </AuthContext.Provider>
    )
}