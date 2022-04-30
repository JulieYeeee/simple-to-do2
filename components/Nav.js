import React from "react";


const Nav = () =>{
    return (
        <nav>
            <div className="inner-nav">
                <div className="logo"><a href="/">Simple To-do</a></div>
                <a className="menu-list" href="/list">你的清單</a>
            </div>
        </nav>
    )
}
export default Nav;