import { useState } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(() => {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
    });

    const setValue = (value: T) => {
        setStoredValue(value);
        localStorage.setItem(key, JSON.stringify(value));
    };

    const removeValue = () => {
        setStoredValue(initialValue);
        localStorage.removeItem(key);
    };

    return { storedValue, setValue, removeValue };
}

export default useLocalStorage;
