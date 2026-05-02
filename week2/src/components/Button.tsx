interface ButtonProps{
    label:string; 
    type?: 'submit'|'button'; //버튼 타입 지정
    color?:string;
    onClick?: ()=>void;
    onSubmit?: ()=>void;
    className?: string;
}
const Button = ({ label, type, color, onClick ,onSubmit, className }: ButtonProps) => {
  return (
    <button
      type={type}
      style={color ? { backgroundColor: color } : undefined}
      className={className}
      onClick={type === 'submit' ? onSubmit : onClick}  // type에 따라 분기
    >
      {label}
    </button>
  );
};

export default Button;