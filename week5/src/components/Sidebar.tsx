import { Link } from "react-router-dom";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30"
                    onClick={onClose}
                />
            )}

            <aside
                className={`
                    fixed top-0 left-0 h-full z-40
                    w-48 bg-gray-800 text-white flex flex-col gap-4 p-4 shrink-0
                    transition-transform duration-300
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                `}
            >
                <p className="text-xs text-gray-400 uppercase tracking-widest">메뉴</p>
                <Link
                    to="/my"
                    className="hover:text-purple-400 transition-colors"
                    onClick={onClose}
                >
                    마이페이지
                </Link>
            </aside>
        </>
    );
};

export default Sidebar;
