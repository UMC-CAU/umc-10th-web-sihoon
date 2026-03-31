import { useState } from 'react'
import './App.css'
import { Link } from './router/Link';
import { Route } from './router/Route';
import { Routes } from './router/Routes';


const Fpage = () => <h1>빨</h1>;
const Spage = () => <h1>주</h1>;
const Tpage = () => <h1>노</h1>;
const NotFound = () => <h1>Not Found</h1>;

function App() {
  return(
    <>
    <nav style={{ display: 'flex', gap: '10px', borderBottom: '1px solid black', paddingBottom: '10px'   }}>
      <Link to='/1'>1</Link>
      <Link to='/2'>2</Link>
      <Link to='/3'>3</Link>
      <Link to='/not-found'>NOT FOUND</Link>
    </nav>


     <Routes>
        <Route path="/1" component={Fpage} />
        <Route path="/2" component={Spage} />
        <Route path="/3" component={Tpage} />
        <Route path="/not-found" component={NotFound} />
      </Routes>
    </>
  )
}



export default App
