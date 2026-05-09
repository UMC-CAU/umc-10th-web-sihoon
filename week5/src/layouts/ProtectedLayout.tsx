import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const ProtextedLayout = () => {
    const { accessToken } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    if (!accessToken) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="h-dvh flex flex-col">
            <Navbar onMenuClick={() => setIsSidebarOpen((prev) => !prev)} />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
                <main className="flex-1 overflow-y-auto p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default ProtextedLayout;
