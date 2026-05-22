import { useState, useEffect } from 'react';


function useDebounce<T>(value:T, delay:number){
   const [debouncedValue, setDebouncedValue] = useState<T>(value);
   
    useEffect(() => {
        const handler=setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

    return () => {
        clearTimeout(handler);
    };

}, [value, delay]); //value나 delay가 변경될 때마다 useEffect가 실행되어 새로운 타이머를 설정하고 이전 타이머를 정리합니다.

return debouncedValue;  //최종적으로 잠시 가디란 후의 값을 반환
} 


export default useDebounce;

