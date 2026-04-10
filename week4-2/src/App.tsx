import "./App.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomePage from "./pages/HomePage"
import NotFoundPage from "./pages/NotFoundPage"
import LoginPage from "./pages/LoginPage"
import Layout from "./layouts/HomeLayout"
import SignupPage from "./pages/SignupPage"

//1. 홈페이지
//2. 로그인 페이지
//3. 회원가입 페이지


const router = createBrowserRouter([

  {
     path: "/",
     element: <Layout />,
     errorElement: <NotFoundPage />,
     children: [
      {path: "/", element: <HomePage />},
      {path: "/login", element: <LoginPage />},
      {path: "signup", element: <SignupPage />}
     ]
  },
  

])
function App() {
  
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
