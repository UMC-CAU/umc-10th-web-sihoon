import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtextedLayout = () => {
    const {accessToken} = useAuth();

    if(!accessToken){
        return  <Navigate to="/login" replace/>;
          
          
    }
    return <Outlet />; // Protected child routes will be rendered here
}

export default ProtextedLayout;
