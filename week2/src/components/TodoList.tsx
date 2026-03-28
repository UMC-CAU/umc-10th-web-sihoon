import type{ TTodo } from"../types/todo";   
import Button from './Button';


interface TodoListProps{
   title:string;
   todos:TTodo[];
   buttonLabel: string;
   buttonColor: string; 
   onClick: (todo:TTodo)=>void;   

}

const TodoList = ({ title, todos, buttonLabel, buttonColor,
     onClick }: TodoListProps  
 )=>{
    return (
        <div className='render-container__section'>
            <h2 className='render-container__title'>{title}</h2>
            <ul id='todo-list' className='render-container__list'>
               {todos.map((todo) => (
                 <li className='render-container__item'>
                <span className='render-container__item-text'>{todo.text}</span>
               <Button label={buttonLabel} className='render-container__item-button' 
               color={buttonColor} onClick ={() => 
                onClick(todo) } />
               </li>
               ))}
            </ul>
         </div>
    );
};

export default TodoList;