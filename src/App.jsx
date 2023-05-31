import React from "react";
import "./style.css";
import { useState } from "react"; 
import { InputTodo } from "./components/InputTodo";
import { IncompleteTodos } from "./components/IncompleteTodos";

export const App = () => {
  // 入力された値のstate
  const [todoText, setTodoText] = useState('');
  // 未完了のTODOを管理する配列（state化）
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  // 完了のTODOを管理する配列（state化）
  const [completeTodos, setCompleteTodos] = useState([])
  
  const onChangeTodotext = (event) => setTodoText(event.target.value)

  // 追加ボタンをクリックしたときの関数
  const onClickAdd = () => {
    if(todoText === "") return;
    // 新しい配列を生成（スプレット構文で現状のTODOと最新で追加されたTODOを結合）
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodoText("");
  }

  // 削除ボタンをクリックしたときの関数
  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1)
    setIncompleteTodos(newTodos);
  }

  // 完了ボタンをクリックしたときの関数
  const onClickComplete = (index) => {
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1);

    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  }

  // 戻るボタンをクリックしたときの関数
  const onClickBack = (index) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);

    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
    setCompleteTodos(newCompleteTodos);
    setIncompleteTodos(newIncompleteTodos);
  }


  return (
    <>
    
      <InputTodo 
        todoText={todoText} 
        onChange={onChangeTodotext} 
        onClick={onClickAdd} 
      />

      <IncompleteTodos todos={incompleteTodos} onClickComplete={onClickComplete} onClickDelete={onClickDelete} />

      <div className="complete-area">
        <p className="title"> 完了のTODO</p>
        <ul>
          {completeTodos.map((todo, index) => {
            return (
              <li key={todo} className="list-row">
                  <p>{todo}</p>
                  <button onClick={ () => onClickBack(index)}>戻す</button>   
              </li>
            );
          })}
        </ul>
      </div>

    </>
  );
}