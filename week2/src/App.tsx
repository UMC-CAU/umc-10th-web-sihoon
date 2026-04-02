
import './index.css'
import Todo from './components/Todo'
import { TodoProvider } from './context/TodoContext'
import { ThemeProvider } from './context/ThemeContext'
import TodoBefore from './components/TodoBefore'

function App() {
 
  return (
    <ThemeProvider>
    <TodoProvider>
     <TodoBefore />
     <Todo />
    </TodoProvider>
    </ThemeProvider>
  )
}

export default App
