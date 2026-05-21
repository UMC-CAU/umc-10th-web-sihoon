import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <div className="h-dvh flex flex-col">
        <nav className="flex gap-4 p-4 border-b">
            <Link to="/">홈</Link>
            <Link to="/login">로그인</Link>
            <Link to="/signup">회원가입</Link>
            <Link to="/my">마이페이지</Link>
        </nav>
        <main className="flex-1">
            <Outlet />
        </main>
        <footer>푸터</footer>
    </div>
  )
};

export default Layout