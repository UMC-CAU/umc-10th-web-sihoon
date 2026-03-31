interface InputProps{
    value:string;
    onChange: (value:string) =>void;
    placeholder?:string;
}

const Input = ({ value, onChange, placeholder }: InputProps) =>
    { 
    return(
        <input
         value={value}
         onChange={(e) => onChange(e.target.value)}
         type='text'
         className='todo-container__input'
         placeholder={placeholder}
         required 
        />
    );  
};
export default Input;