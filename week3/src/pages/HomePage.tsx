import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
const Homepage = () => {
  return (
    <div>
      <Navbar />
      <Outlet />   {/* '/'로 시작하는 모든 경로에서 공통적으로 보여지는 컴포넌트. */}
    </div>
  )
};

export default Homepage;