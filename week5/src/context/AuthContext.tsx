import { createContext, useContext, useState } from "react";
import type { RequestSigninDto } from "../types/auth.ts";
import useLocalStorage from "../hooks/useLocalStorage.ts";
import type { PropsWithChildren } from "react";
import { LOCAL_STORAGE_KEY } from "../constants/key.ts";
import { signin } from "../apis/auth.ts";


interface AuthContextType {
    accessToken: string | null;
    refreshToken: string | null;

    login: (signinData: RequestSigninDto) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
    accessToken: null,
    refreshToken: null,
    login: async () => {},
    logout: async () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const {
        getItem: getAccessTokenFromStorage,
        setItem: setAccessTokenInStorage,
        removeItem: removeAccessTokenFromStorage
    } = useLocalStorage<string | null>(LOCAL_STORAGE_KEY.accessToken, null);

    const {
        getItem: getRefreshTokenFromStorage,
        setItem: setRefreshTokenInStorage,
        removeItem: removeRefreshTokenFromStorage
    } = useLocalStorage<string | null>(LOCAL_STORAGE_KEY.refreshToken, null);

    const [accessToken, setAccessToken] = useState<string | null>(
        getAccessTokenFromStorage(),
    );

    const [refreshToken, setRefreshToken] = useState<string | null>(
        getRefreshTokenFromStorage(),
    );

    const login = async (signinData: RequestSigninDto) => {
        try {
            const data = await signin(signinData);

            if (data) {
                const newAccessToken = data.data.accessToken;
                const newRefreshToken = data.data.refreshToken;

                setAccessTokenInStorage(newAccessToken);
                setRefreshTokenInStorage(newRefreshToken);
                setAccessToken(newAccessToken);
                setRefreshToken(newRefreshToken);
                alert("로그인 성공");
            }
        } catch (error) {
            console.error("로그인 실패", error);
            alert("로그인 실패");
        }
    };

    const logout = async () => {
        removeAccessTokenFromStorage();
        removeRefreshTokenFromStorage();
        setAccessToken(null);
        setRefreshToken(null);
    };

    return (
        <AuthContext.Provider value={{ accessToken, refreshToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context: AuthContextType = useContext(AuthContext);
    if (!context) {
        throw new Error("AuthContext를 찾을 수 없습니다");
    }
    return context;
};
