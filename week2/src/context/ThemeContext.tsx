import { createContext, useContext, useState } from "react";

interface IThemeContext {
    isDark: boolean;
    toggleTheme: () => void;
}

const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [isDark, setIsDark] = useState(false);

    const toggleTheme = () => {
        setIsDark((prev) => {
            document.documentElement.classList.toggle("dark", !prev);  //html 태그에 dark 클래스 토글
            return !prev;
        });
    };

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme: toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
    
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("ThemeProvider 밖에서 사용됨");
  return context;
};
