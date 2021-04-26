import React, { useState, useCallback } from "react";
import "./styles/styles.css";

export default function Input(props) {
  const { onAdd, btnTitle } = props;

  const [text, setText] = useState("");

  const textHandler = () => {
    setText(text);
    onAdd(text); 
    setText("");
  };
  const onChangeHandler = useCallback((e) => {
    setText(e.target.value);
  }, []);

  return (
    <div className="input-div">
      <input onChange={onChangeHandler} value={text} palceholder="title" />
      <button onClick={textHandler}> {btnTitle ? btnTitle : "add"} </button>
    </div>
  );
}