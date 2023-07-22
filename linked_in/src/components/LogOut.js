import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogOut = ({onLogOut}) => {
    const navigate = useNavigate();

    useEffect(() => {
        console.log('Hello');
        localStorage.clear('isLoggedIn');
        localStorage.clear('userID');
        localStorage.clear('activeComponent');

        navigate('/login');

        onLogOut();
    }, [navigate, onLogOut])
}

export default LogOut