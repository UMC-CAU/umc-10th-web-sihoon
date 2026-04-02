import './App.css'
import Homepage from './pages/HomePage';
import MoviePage from './pages/Moviepage';
import { createBrowserRouter, Route, RouterProvider } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
    errorElement: <NotFoundPage />,
    children: [     //부모 라우트   /   안에 자식 라우트  /movies/category를 품는 구조
      {
        path: 'movies/:category',   // category만 쓰면 고정 문자열. :category로 쓰면 url에서 
                                                       // category부분이 바뀌어도 라우트가 유지됨.
        element: <MoviePage />,
      }

    ],
  },
]);

function App() {
  
  return (
    <>
      <RouterProvider router={router} />
    </>
  )

}

export default App;