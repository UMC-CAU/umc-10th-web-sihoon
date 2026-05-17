import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { signout } from "../../apis/auth";
import { useAuth } from "../../context/AuthContext";

function useLogout() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async () => {
            await signout();
            await logout();
        },
        onSuccess: () => navigate("/login"),
    });
}

export default useLogout;
