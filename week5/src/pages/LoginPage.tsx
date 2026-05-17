import useForm from "../hooks/useForm";
import { validateSignin, type UserSignInformation } from "../utils/validate";
import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/mutations/useLogin";

const LoginPage = () => {
    const navigate = useNavigate();
    const { mutate: login, isPending } = useLogin();

    const { values, errors, touched, getInputProps } = useForm<UserSignInformation>({
        initialValues: { email: "", password: "" },
        validate: validateSignin,
    });

    const handleSubmit = () => {
        login(values, { onSuccess: () => navigate("/") });
    };

    const handleGoogleLogin = () => {
        window.location.href = import.meta.env.VITE_SERVER_API_URL + "/v1/auth/google/login";
    };

    const isDisabled =
        Object.values(errors || {}).some((e) => e.length > 0) ||
        Object.values(touched).length === 0;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
            <h1 className="text-2xl font-bold">로그인</h1>

            <input {...getInputProps("email")} type="email" placeholder="이메일" className="border border-gray-300 rounded px-4 py-2 w-72" />
            {errors.email && touched.email && <p className="text-red-500 text-sm">{errors.email}</p>}

            <input {...getInputProps("password")} type="password" placeholder="비밀번호" className="border border-gray-300 rounded px-4 py-2 w-72" />
            {errors.password && touched.password && <p className="text-red-500 text-sm">{errors.password}</p>}

            <button
                onClick={handleSubmit}
                disabled={isDisabled || isPending}
                className="bg-blue-500 text-white rounded px-4 py-2 w-72 hover:bg-blue-600 disabled:opacity-50"
            >
                {isPending ? "로그인 중..." : "로그인"}
            </button>

            <button onClick={handleGoogleLogin} className="bg-blue-500 text-white rounded px-4 py-2 w-72 hover:bg-blue-600">
                <div className="flex items-center justify-center gap-4">
                    <img className="w-6 h-6" src="/22222.png" alt="Google Logo" />
                    <span>구글 로그인</span>
                </div>
            </button>
        </div>
    );
};

export default LoginPage;
