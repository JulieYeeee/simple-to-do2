import React from "react";


const TodoItem = ({ setNotice, setList, list, itemObj }) =>{

    const remove = () =>{
        //if to-do list is not null
        if( list[0] != null ){
            //a variable for deep copy
            let newList;
            //check which to-do item should be removed
            for( let num = 0 ; num < list.length ; num++ ){
                if( list[num].id === itemObj.id ){
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
    return(
        <div className="todo-item" >
            <p>{itemObj.item}</p>
            <div className="delete-btn" onClick={remove}>刪除</div>
        </div>
    )
}

export default TodoItem;