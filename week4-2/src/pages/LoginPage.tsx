import useForm from "../hooks/useForm";
import { signin } from "../apis/auth";
import type { ResponseSigninDto } from "../types/auth";
import { validateSignin, type UserSignInformation } from "../utils/validate";


const LoginPage = () => {
  const {values, errors, touched, getInputProps} = useForm<UserSignInformation>({
    initialValues: {
      email: "",
      password: "",
    },
    validate:validateSignin,
});

  const handleSubmit = async() => {
    try{
        const response: ResponseSigninDto = await signin(values);
        localStorage.setItem("accessToken", response.data.accessToken);
        console.log(response);
    }
    catch (error){
        alert("에러!");
    }
  }

  const isDisabled=
    Object.values(errors||{}).some((error) => error.length>0) ||
    Object.values(touched).length === 0;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-2xl font-bold">로그인</h1>
      <input
        {...getInputProps("email")}
        type="email"
        placeholder="이메일"
        name="email"
     
        className="border border-gray-300 rounded px-4 py-2 w-72"
      />

      {errors.email && touched.email && (
        <p className="text-red-500 text-sm">{errors.email}</p>
      )
      }
      <input
       {...getInputProps("password")}
        type="password"
        placeholder="비밀번호"
        name="password"
        className="border border-gray-300 rounded px-4 py-2 w-72"
      />
      {errors.password && touched.password && (
        <p className="text-red-500 text-sm">{errors.password}</p>
      )}
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white rounded px-4 py-2 w-72 hover:bg-blue-600"
      >
        로그인
      </button>
    </div>
  )
}

export default LoginPage
