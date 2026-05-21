import React from 'react'; 
import Input from './Input';
import Button from './Button';

interface TodoFormProps{
   input:string;
   setInput: (input:string)=>void;
   handleSubmit:(e:React.FormEvent<HTMLFormElement>)=>void;

}



const TodoForm = ({ input, setInput, handleSubmit }: TodoFormProps  )=>
    {
    return (
        <form onSubmit={handleSubmit} className='todo-container__form'>
      <Input value={input} onChange={setInput} placeholder='할 일 입력' />
      <Button label='할 일 추가'  color='blue' type='submit' 
       className='todo-container__button' />
    </form>
    )
}

export default TodoForm;
