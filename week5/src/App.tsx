import "./App.css"
import { createBrowserRouter, RouterProvider, type RouteObject } from "react-router-dom"
import HomePage from "./pages/HomePage"
import NotFoundPage from "./pages/NotFoundPage"
import LoginPage from "./pages/LoginPage"
import Layout from "./layouts/HomeLayout"
import SignupPage from "./pages/SignupPage"
import MyPage from "./pages/Mypage"
import LpDetailPage from "./pages/LpDetailPage"
import { AuthProvider } from "./context/AuthContext"
import HomeLayout from "./layouts/HomeLayout"
import ProtextedLayout from "./layouts/ProtectedLayout"
import GoogleLoginRedirectPage from "./pages/GoogleLoginRedirectPage"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React from "react"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

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
      {path:"lp/:lpId", element:<LpDetailPage/>},
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

const router = createBrowserRouter([
    ...publicRoutes,
    ...protectedRoutes,
    { path: "/v1/auth/google/callback", element: <GoogleLoginRedirectPage /> },
]);


export const queryClient = new QueryClient();

function App() {
  
  return (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
  )
}

export default App
