import { type FormEvent, useState } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { useTodo } from "../context/TodoContext";
import { useTheme } from "../context/ThemeContext";



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
      const { isDark, toggleTheme } = useTheme();


    return (
        <div className={isDark ? "todo-container bg-gray-800 text-white" : "todo-container bg-white text-black"}>
            <div className="flex justify-between items-center mb-4">
                <h1 className='todo-container__header'>SIHOON TODO</h1>
                <button onClick={toggleTheme}>{isDark ? "☀️ 라이트모드" : "🌙 다크모드"}</button>
            </div>
            <TodoForm input={input} setInput={setInput} handleSubmit={handleSubmit} />

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