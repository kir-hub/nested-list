import React, { useState } from "react";
import Input from "./Input";
import Note from "./Note";
import "./styles/styles.css";

export default function NoteList() {
  const [list, setList] = useState([]);

  const addToList = (value) => {
    const date = new Date();
    const newList = [
      {
        title: value,
        date: date
      },
      ...list
    ];
    setList(newList);
  };

  const deleteList = (index) => {
    const newList = [...list];
    newList.splice(index, 1);
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
        <li key={item.date}>
          <Note
            nav={true}
            store={list}
            moveUpFunc={moveUp}
            moveDownFunc={moveDown}
            title={item.title}
            deleteList={deleteList}
            index={index}
          />
        </li>
      ))}
      <Input onAdd={addToList} />
    </div>
  );
}
