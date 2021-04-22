import React, { useState, useEffect } from "react";
import Input from "./Input";
import Note from "./Note";
import {getNotes, addNote, deleteNote, moveNote} from '../utils/api/api'
import "./styles/styles.css";

export default function NoteList() {
  const [list, setList] = useState([]);

  const fetchNotes = async()=>{
    try {
      const newNotes = await getNotes()
      setList([...newNotes.filter((i)=>!i.parentId)])
    } catch (error) {
      console.log(error);
    }
  }

  const createNote = async(title)=>{
    try {
      await addNote(title,null)
    } catch (error) {
      console.log(error);
    }
  } 

    useEffect(()=>{
      fetchNotes()
    },[])

  const addToList = async (value) => {
    const date = new Date();
    const newList = [
      {
        title: value,
        date: date
      },
      ...list
    ];
    await createNote(newList[0].title)
    await fetchNotes()
  };

  const deleteList = (index) => {
    const newList = [...list];
    const listToDelete = newList.splice(index, 1)[0];
     deleteNote(listToDelete._id)
    setList(newList);
  };

  const moveUp = (index) => {
    const newList = [...list];
    const movingItem = newList.splice(index, 1)[0];
    newList.splice(index - 1, 0, movingItem);
    setList(newList);
  };

  const moveDown = (index) => {
    const newList = [...list];
    const movingItem = newList.splice(index, 1)[0];
    newList.splice(index + 1, 0, movingItem);
    setList(newList);
  };

  return (
    <div className="notelist">
      {list.map((item, index) => (
        <li key={item._id}>
          <Note
            nav={true}
            store={list}
            moveUpFunc={moveUp}
            moveDownFunc={moveDown}
            title={item.title}
            deleteList={deleteList}
            index={index}
            id={item._id}
          />
        </li>
      ))}
      <Input onAdd={addToList} />
    </div>
  );
}
