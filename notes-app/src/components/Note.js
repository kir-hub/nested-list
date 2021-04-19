import React, { useState } from "react";
import Input from "./Input";
import "./styles/styles.css";

export default function Note(props) {
  const {
    title,
    index,
    deleteList,
    moveUpFunc,
    moveDownFunc,
    store,
    nav
  } = props;

  const [list, setList] = useState([]);

  // добавляет вложенный список
  const addSublist = (value) => {
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

  // удаляет элемент списка
  const removeList = () => {
    if (deleteList) {
      deleteList(index);
    } else {
      deleteSublist(index);
    }
  };

  // удаляет вложенный список
  const deleteSublist = (index) => {
    const newList = [...list];
    newList.splice(index, 1);
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
        {list.length ? (
          ""
        ) : (
          <Input
            onAdd={addSublist}
            btnTitle={list.length ? "add " : "add sublist"}
          />
        )}

        <ul className="ul-container">
          {list.map((item, index) => (
            <li key={item.date}>
              <Note title={item.title} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
