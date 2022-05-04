import React,{useEffect} from "react";
import { firebaseApp } from "../firebase.config";
import { getFirestore,getDocs } from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";
import {collection, query, where , limit } from "firebase/firestore";



const TodoItem = ({ setNotice, setList, list, itemObj }) =>{
    

    const remove = () =>{
        //if to-do list is not null
        if( list[0] != null ){
            //a variable for deep copy
            let newList;
            //check which to-do item should be removed
            for( let num = 0 ; num < list.length ; num++ ){
                if( list[num].id === itemObj.id ){
                    geData(itemObj.id);
                    
                    list.splice(num,1);
                    newList=JSON.parse(JSON.stringify(list));
                    //update to-do list
                    setList(newList);
                    //after removing to-do item, if to-do list is null, show the notice
                    if( list[0] == null ){
                        setNotice("尚未有待辦事項");
                    }
                }
            }

        }else{
            setNotice("尚未有待辦事項");;
        }
    }

    const geData = async (id) =>{
        //get project db from firestore and get initial to-do list data
        const db = getFirestore(firebaseApp);
        let order = query(collection(db, "todolist"),where("id", "==", parseInt(id)));
        let docs = await getDocs (order);
        console.log(docs);
        let fileName;
        docs.forEach((doc)=>{
            fileName = `${doc.id}`;
        })
        console.log( fileName);
        let result = await deleteDoc(doc(db,"todolist",fileName));
        console.log(result);
        
    }

    return(
        <div className="todo-item" >
            <p>{itemObj.item}</p>
            <div className="delete-btn" onClick={remove}>刪除</div>
        </div>
    )
}

export default TodoItem;