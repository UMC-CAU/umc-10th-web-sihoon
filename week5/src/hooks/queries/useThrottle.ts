import { useEffect, useRef, useState } from "react";


function useThrottle<T>(value: T, delay: number): T {
    const [throttledValue, setThrottledValue] = useState<T>(value);
    const lastExecuted = useRef<number>(0);

    useEffect(() => {

        if(Date.now()>=lastExecuted.current + delay){
            setThrottledValue(value);
            lastExecuted.current = Date.now();
        }

        else{ // 충분한 시간이 지나지 않았으면, delay 시간 후에 업데이트
            const timerid = setTimeout(() => {
                lastExecuted.current = Date.now();
                setThrottledValue(value);
            },delay);
              

            //클린업 함수가 재실행되기 전에 타이머가 실행되지 않았다면
            //기존 타이머를 정리하여 불필요한 업데이트를 방지
            return() => clearTimeout(timerid);
        }
    },[value, delay]);

    return throttledValue;
}

export default useThrottle;