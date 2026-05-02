import { useEffect, useState } from "react";

interface UseFormProps<T> {
    initialValues: T; //값이 올바른지 검증
    validate: (values: T) => Record<string, string>; //값이 올바른지 검증
  
}  

function useForm<T>({ initialValues, validate }: UseFormProps<T>) {
    const [values, setValues] = useState<T>(initialValues);
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (name: keyof T, text: string) => {
        setValues((prev) => ({ ...prev, [name]: text }));
    };

    const handleBlur = (name: keyof T) => {
        setTouched({
            ...touched,
            [name]: true,
        });

    }

    const getInputProps = (name: keyof T) => {
        const value :T[keyof T] = values[name];

        const onChange= (e: React.ChangeEvent<HTMLInputElement>) => 
            handleChange(name, e.target.value)
    
        const onBlur = () => handleBlur(name);
        return { value, onChange, onBlur };
     }
        
        useEffect(() => {
            const newErrors = validate(values);
            setErrors(newErrors);
        }, [values, validate]);

    return {values, errors, touched, getInputProps};
}

export default useForm;