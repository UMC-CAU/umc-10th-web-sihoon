import { useEffect } from "react";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import useLocalStorage from "../hooks/useLocalStorage";

const GoogleLoginRedirectPage = () => {
    const { setItem: setAccessToken } = useLocalStorage<string | null>(LOCAL_STORAGE_KEY.accessToken, null);
    const { setItem: setRefreshToken } = useLocalStorage<string | null>(LOCAL_STORAGE_KEY.refreshToken, null);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get("accessToken");
        const refreshToken = urlParams.get("refreshToken");

        if (accessToken) {
            setAccessToken(accessToken);
            setRefreshToken(refreshToken);
            window.location.href = "/my";
        }
    }, [setAccessToken, setRefreshToken]);

    return null;
};

export default GoogleLoginRedirectPage; 

