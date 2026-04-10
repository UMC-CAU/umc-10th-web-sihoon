import useForm from "../hooks/useForm";
import { validateSignin, type UserSignInformation } from "../utils/validate";


const LoginPage = () => {
  const {values, errors, touched, getInputProps} = useForm<UserSignInformation>({
    initialValues: {
      email: "",
      password: "",
    },
    validate:validateSignin,
});

  const handleSubmit = () => {
  }

  const isDisabled=
    Object.values(errors||{}).some((error) => error.length>0) ||
    Object.values(touched).length === 0;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-2xl font-bold">회원가입</h1>
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
