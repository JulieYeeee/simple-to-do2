import { Link } from "react-router-dom";
import React from "react";

const Intro = () =>{
    return(
        <main className="intro-page-main">
            <div className="background">
            <div className="CTA">
                <p>Simple To-do <br/>立即開始你的清單</p>
                <Link to="/list" className="button" >
                    <p>Try Now</p><div className="icon"><p>→</p></div>
                </Link>
            </div>
            </div>
            
            <div className="feature">
                <div className="f1"><p>簡單<br/>Easy to Use</p></div>
                <div className="f2"><p>免費<br/>100% Free</p></div>
                <div className="f3"><p>免註冊<br/>No Registration Required</p></div>
            </div>
        </main>
    )
}
export default Intro;