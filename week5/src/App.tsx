import "./App.css"
import { createBrowserRouter, RouterProvider, type RouteObject } from "react-router-dom"
import HomePage from "./pages/HomePage"
import NotFoundPage from "./pages/NotFoundPage"
import LoginPage from "./pages/LoginPage"
import Layout from "./layouts/HomeLayout"
import SignupPage from "./pages/SignupPage"
import MyPage from "./pages/Mypage"
import { AuthProvider } from "./context/AuthContext"
import HomeLayout from "./layouts/HomeLayout"
import ProtextedLayout from "./layouts/ProtectedLayout"

//1. 홈페이지
//2. 로그인 페이지
//3. 회원가입 페이지


const publicRoutes:RouteObject[] =[
  {
    path:"/",
    element:<HomeLayout/>,
    errorElement:<NotFoundPage/>,
    children:[
      { index:true, element:<HomePage/> },
      {path:"login", element:<LoginPage/>},
      {path:"signup", element:<SignupPage/>},
    ],
  },
];

const protectedRoutes:RouteObject[]=[
  {
    path:"/",
    element:<ProtextedLayout/>,
    errorElement:<NotFoundPage/>,
    children:[
      {
        path:"my",
        element:<MyPage/>
      },
    ],
  },
];

const router = createBrowserRouter([...publicRoutes,...protectedRoutes]);

function App() {
  
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
