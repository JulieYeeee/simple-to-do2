import React from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "../components/Nav";
import Intro from "../page/Intro";
import List from "../page/List";
import "../static/app.css"


const App = () =>{
    return(
        <div>
            <Nav/>
            <Routes>
                <Route path="/" exact element={<Intro/>} />
                <Route path="/list" exact element={<List/>} />
            </Routes>
        </div>
    )
}
export default App;