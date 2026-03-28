import { type FormEvent, useState } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { useTodo } from "../context/TodoContext";



const Todo = ()=>{
    const [input, setInput] = useState<string>('');
   
    const context = useTodo();

    const handleSubmit = (e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const text= input.trim();
        if(text) {
            context?.addTodo(text);
            setInput('');
        }

    }


    return (
        <div className='todo-container'>
            <h1 className='todo-container__header'>SIHOON TODO</h1>
            <TodoForm input={input} setInput={setInput}
            handleSubmit={handleSubmit} />

            <div className='render-container'>
            <TodoList
            title='할 일' 
            todos={context?.todos} 
            buttonLabel='완료'
            buttonColor='#28a745'
            onClick={context?.completeTodo}
            />

            <TodoList
            title='완료' 
            todos={context?.doneTodos} 
            buttonLabel='삭제'
            buttonColor='#dc3545'
            onClick={context?.deleteTodo}
            />

            </div>
        </div>
    )
}

export default Todo;