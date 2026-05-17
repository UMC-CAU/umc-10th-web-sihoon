import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useLogout from "../hooks/mutations/useLogout";

interface NavbarProps {
    onMenuClick?: () => void;
}

const Navbar = ({ onMenuClick }: NavbarProps) => {
    const { accessToken, name } = useAuth();
    const { mutate: logout, isPending } = useLogout();

    return (
        <nav className="w-full bg-gray-900 text-white px-6 py-3 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
                {onMenuClick && (
                    <button onClick={onMenuClick} className="text-white">
                        <img src="/hamburger-button.svg" alt="메뉴" className="w-7 h-7 invert" />
                    </button>
                )}
                <Link to="/" className="text-xl font-bold text-purple-400 hover:text-purple-300 transition-colors">
                    LP
                </Link>
            </div>

            <div className="flex items-center gap-6 text-sm font-medium">
                <Link to="/" className="hover:text-purple-400 transition-colors">홈</Link>
                {accessToken ? (
                    <>
                        {name && <span className="text-gray-300 text-sm">{name}님 ㅎㅇㅇ!</span>}
                        <Link to="/my" className="hover:text-purple-400 transition-colors">마이페이지</Link>
                        <button
                            onClick={() => logout()}
                            disabled={isPending}
                            className="bg-purple-600 hover:bg-purple-700 px-4 py-1 rounded-full transition-colors disabled:opacity-50"
                        >
                            로그아웃
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="hover:text-purple-400 transition-colors">로그인</Link>
                        <Link to="/signup" className="bg-purple-600 hover:bg-purple-700 px-4 py-1 rounded-full transition-colors">
                            회원가입
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
