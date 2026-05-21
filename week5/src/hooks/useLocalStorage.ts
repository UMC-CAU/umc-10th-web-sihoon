import { useState } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(() => {
        const item = localStorage.getItem(key);
        if (!item) return initialValue;
        try {
            return JSON.parse(item);
        } catch {
            return item as unknown as T;
        }
    });

    const setValue = (value: T) => {
        setStoredValue(value);
        localStorage.setItem(key, JSON.stringify(value));
    };

    const removeValue = () => {
        setStoredValue(initialValue);
        localStorage.removeItem(key);
    };

   return { 
    getItem: () => storedValue,
    setItem: setValue,
    removeItem: removeValue 
};
}

export default useLocalStorage;
