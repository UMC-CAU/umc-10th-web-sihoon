import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="h-dvh flex flex-col">
        <nav>네비</nav>
        <main className="flex-1">
        <Outlet />
        </main>
        <footer>푸터</footer>
        
    </div>
  )
};

export default Layout