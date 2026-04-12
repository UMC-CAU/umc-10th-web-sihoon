import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod/src/index.js";
import { signup } from "../apis/auth";
import type { ResponseSignupDto } from "../types/auth";

const schema = z.object({
    email: z.string().email({ message: "이메일 형식이 올바르지 않습니다." }),
    password: z.string()
        .min(8, { message: "비밀번호는 최소 8자 이상이어야 합니다." })
        .max(20, { message: "비밀번호는 최대 20자 이하여야 합니다." }),
    passwordCheck: z.string().min(8, { message: "비밀번호 확인은 최소 8자 이상이어야 합니다." }),
    name: z.string()
        .min(2, { message: "이름은 최소 2자 이상이어야 합니다." })
        .max(30, { message: "이름은 최대 30자 이하여야 합니다." }),
}).refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호와 비밀번호 확인이 일치하지 않습니다.",
    path: ["passwordCheck"],
})

type FormFields = z.infer<typeof schema>;

const SignupPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormFields>({
        defaultValues: {
            email: "",
            password: "",
            passwordCheck: "",
            name: "",
        },
        resolver: zodResolver(schema),
    })

    const onSubmit: SubmitHandler<FormFields> = async(data) => {
        const{passwordCheck, ...rest}=data;
        const response: ResponseSignupDto = await signup(rest);
        console.log(response);
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
            <h1 className="text-2xl font-bold">회원가입</h1>
            <input
                {...register("email")}
                type={"email"}
                placeholder="이메일"
                className="border border-gray-300 rounded px-4 py-2 w-72"
            />
            {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}

            <input
                {...register("password")}
                type={"password"}
                placeholder="비밀번호"
                className="border border-gray-300 rounded px-4 py-2 w-72"
            />
            {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}

            <input
                {...register("passwordCheck")}
                type={"password"}
                placeholder="비밀번호 확인"
                className="border border-gray-300 rounded px-4 py-2 w-72"
            />
            {errors.passwordCheck && (
                <p className="text-red-500 text-sm">{errors.passwordCheck.message}</p>
            )}

            <input
                {...register("name")}
                type={"text"}
                placeholder="이름"
                className="border border-gray-300 rounded px-4 py-2 w-72"
            />
            {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}

            <button
                onClick={handleSubmit(onSubmit)}
                className="bg-blue-500 text-white rounded px-4 py-2 w-72 hover:bg-blue-600"
            >
                회원가입
            </button>
        </div>
    )
}

export default SignupPage

