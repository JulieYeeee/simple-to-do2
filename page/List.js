import React,{ useState,useEffect } from "react";
import TodoItem from "../components/TodoItem"
import { firebaseApp } from "../firebase.config";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc ,getDocs  } from "firebase/firestore"; 
import { query, orderBy } from "firebase/firestore";



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
    
    //get project db from firestore and get initial to-do list data
    const db = getFirestore(firebaseApp);
    //set a buffer to prevent useEffect from running twice
    let buffer = false;
    useEffect(() => { getList() },[]);
    const getList = async () =>{
        let initList = [] ;
        if( !buffer ){
             buffer = true;
             //make sure data would be in order
             let order = query( collection(db, "todolist"), orderBy("id") );
             //fetch firestore and update to-do list state array
             let docs = await getDocs(order);
             docs.forEach( (doc) => {
                 setNum(parseInt(`${doc.data()["id"]}`)+1);
                 initList.push({item: `${doc.data()["item"]}` , id: `${doc.data()["id"]}`});
                }
             );
             setList(list.concat(initList)) ; 
        }
           
        //if to-do list is not null,remove the notice
        if(list[0]!==null){
            setNotice("");
        }else{
            return;
        }
    }
     
    // the function below will be triggered when the user adds a new to-do item
    const addToList = async (e) =>{
        e.preventDefault();
        if(item!==""){
            // store data in firestore  
            try {
                const docRef =  await addDoc(collection(db, "todolist"), 
                    {
                        item: item,
                        id: num,
                    }
                );
                console.log("Document written with ID: ", docRef.id);
                setNotice("");
                setNum(parseInt(num)+1);
                setList([...list , { item:item , id:num }]);
            } catch (e) {
                console.error("Error adding document: ", e);
            }
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