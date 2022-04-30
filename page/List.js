import React,{ useState } from "react";
import TodoItem from "../components/TodoItem"


const List = () =>{
    //detect input value
    let [ item , setItem ] = useState("");
    const inputChange = (e) =>{
        setItem(e.target.value);
    };
    //if there's no to-do item, show a notice"尚未有待辦事項"
    let [ notice, setNotice ] = useState("尚未有待辦事項");
    //generate a number for setting key of state array
    let [ num , setNum] = useState(0);
    //store every to-do item in an array list
    let [ list , setList ] = useState([]);    

    const addToList = (e) =>{
        e.preventDefault();
        if(item!==""){
            setNotice("");
            setNum(num+1);
            setList([...list , { item:item , id:num }]);
        }
    };

    return(
        <main className="list-page-main">
            <div className="list-element-container">
                <h1>列下你的代辦事項</h1>
                <form>
                    <input onChange={inputChange} placeholder="type here..."></input>
                    <button type="submit" onClick={addToList} >新增</button>
                </form>
                <div className="bar"></div>
                <div className="todo-container">
                    <p>{notice}</p>
                    {list.map(( itemObj )=>
                        <TodoItem setNotice={setNotice} setList={setList} list={list} itemObj={itemObj} key={itemObj.id}/>
                    )}
                </div>
            </div>
        </main>
    )
}
export default List;