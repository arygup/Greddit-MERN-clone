import React from "react";
import logo from './logo512.png'; 
import { FaHome } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
function Header() {
    function logout(e) {
        e.preventDefault();
        localStorage.removeItem('jwt');
        window.location.href = "/";
    }
    const userpage = (e) => {
        e.preventDefault();
        window.location.href="/user";
    }
    const allsubs = (e) => {
        e.preventDefault();
        window.location.href="/sub/all";
    }
    return (
        <div className="header">
            <button onClick={allsubs} className="usrbutton"><img src={logo} alt="Logo"/></button>
            <button onClick={userpage} className="userbutton"><FaHome/></button>  
            <button onClick={logout} className="usrbutton"><FaTrashAlt/></button>  
        </div>
    )
}


export default Header