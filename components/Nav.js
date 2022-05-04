import React from "react";
import { Link } from "react-router-dom";


const Nav = () =>{
    return (
        <nav>
            <div className="inner-nav">
                <div className="logo"><Link to="/">Simple To-do</Link></div>
                <Link className="menu-list" to="/list">你的清單</Link>
            </div>
        </nav>
    )
}
export default Nav;