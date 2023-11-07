import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogOut = () => {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.clear('isLoggedIn');
        localStorage.clear('token');

        navigate('/login');

    }, [navigate]);
}

export default LogOut;