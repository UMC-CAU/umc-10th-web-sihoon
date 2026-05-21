import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { deleteAccount } from "../../apis/auth";
import { useAuth } from "../../context/AuthContext";

function useDeleteAccount() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async () => {
            await deleteAccount();
            await logout();
        },
        onSuccess: () => navigate("/login"),
    });
}

export default useDeleteAccount;
