import React from "react";
import "./style.css";
import { useState } from "react"; 

export const App = () => {
  // 入力された値のstate
  const [todoText, setTodoText] = useState('');
  // 未完了のTODOを管理する配列（state化）
  const [incompleteTodos, setIncompleteTodos] = useState(['肩トレ', '胸肉仕込み']);
  // 完了のTODOを管理する配列（state化）
  const [completeTodos, setCompleteTodos] = useState(['React勉強'])
  
  const onChangeTodotext = (event) => setTodoText(event.target.value)

  // 追加ボタンをクリックしたときの関数
  const onClickAdd = () => {
    if(todoText === "") return;
    // 新しい配列を生成（スプレット構文で現状のTODOと最新で追加されたTODOを結合）
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodoText("");
  }


  return (
    <>
      <div className="input-area">
        <input placeholder="TODOを入力" value={todoText} onChange={onChangeTodotext} />
        <button onClick={onClickAdd}>追加</button>
      </div>

      <div className="incomplete-area">
        <p className="title"> 未完了のTODO</p>
        <ul>
          {incompleteTodos.map((todo) => {
            return (
              <li key={todo} className="list-row">
                <p>{todo}</p>
                <button>完了</button>
                <button>削除</button>
              </li>
            );
           })}
        </ul>
      </div>

      <div className="complete-area">
        <p className="title"> 完了のTODO</p>
        <ul>
          {completeTodos.map((todo) => {
            return (
              <li key={todo} className="list-row">
                  <p>{todo}</p>
                  <button>戻す</button>   
              </li>
            );
          })}
        </ul>
      </div>

    </>
  );
}