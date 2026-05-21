import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import type { RequestSigninDto } from "../../types/auth";

function useLogin() {
    const { login } = useAuth();

    return useMutation({
        mutationFn: (data: RequestSigninDto) => login(data),
    });
}

export default useLogin;
