import React, { useState, useEffect } from "react";
import Input from "./Input";
import {getNestNotes, addNote, deleteNote} from '../utils/api/api'
import "./styles/styles.css";

export default function Note(props) {
  const {
    title,
    index,
    deleteList,
    moveUpFunc,
    moveDownFunc,
    store,
    nav,
    id,
  } = props;

  const [list, setList] = useState([]);

  const createNote = async(title, parentId)=>{
    try {
      await addNote(title,  parentId)
    } catch (error) {
      console.log(error);
    }
  } 

  const fetchNotes = async()=>{
    try {
      const newNotes = await getNestNotes()
      setList([...newNotes.data.filter((item) =>item.parentId === id )])
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchNotes()
  },[])

  // добавляет вложенный список
  const addSublist = async(value) => {
    const date = new Date();
    const newList = [
      {
        title: value,
        date: date
      },
      ...list
    ];
    await createNote(newList[0].title, id)
    await fetchNotes()
    // setList(newList);
  };
  // удаляет элемент списка
  const removeList =  () => {
    if (deleteList) {
       deleteList(index);
      // rmAll()
    } else {
      deleteSublist(index);
      //  rmAll()

    }
  };

  const rmAll =()=>{
    const newList = [...list];
    if(list.length > 0){
      for(let i =0; i<= newList.length; i++){
      const sublistToDolete = newList.splice(i, 1)[0];
      deleteNote(sublistToDolete._id)
      }
    }
  }

  // удаляет вложенный список
  const deleteSublist = (index) => {
    const newList = [...list];
    const sublistToDolete = newList.splice(index, 1)[0];
    deleteNote(sublistToDolete._id)
    setList(newList);
  };

  // навигация
  const moveUp = () => {
    moveUpFunc(index);
  };
  const moveDown = () => {
    moveDownFunc(index);
  };

  return (
    <div className="main">
      {deleteList ? (
        <button className="delete-btn" onClick={removeList}>
          X
        </button>
      ) : (
        ""
      )}
      <h1>{title}</h1>
      <div className="navbar">
        {/* store нужен для проверки на каком месте в листе 
  находтся элементы списка, а nav, чтобы кнопки навигация 
  отображались только в списке верхнего уровня */}
        {nav && store[0].title !== title ? (
          <button onClick={moveUp}>/\</button>
        ) : (
          ""
        )}
        {nav && store[store.length - 1].title !== title ? (
          <button onClick={moveDown}>\/</button>
        ) : (
          ""
        )}
      </div>
      <div className="sublist-div">
        {list.length ? (
          <button className="remove-sublist" onClick={deleteSublist}>
            X
          </button>
        ) : (
          ""
        )}
        {
          <Input
            onAdd={addSublist}
            btnTitle={list.length ? "add " : "add sublist"}
          />
          
        }<hr/>

        <ul className="ul-container">
          {list.map((item, index) => (
            
            <li key={item._id}>
              <button className="remove-sublist" onClick={deleteSublist}>
            remove sublists
          </button>
              <Note isParentId={true} title={item.title} id={item._id} />
              
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
