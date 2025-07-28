import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../store/thunkFunctions'

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' })

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async ({ email, password, name }) => {
    const body = {
      email,
      password,
      name,
      image: `https://via.placeholder.com/150`
    }
    try {
      await dispatch(registerUser(body)).unwrap();
      navigate('/login');
    } catch (error) {
      console.error('회원가입 실패:', error);
    }
  }

  const inputStyles = "w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";
  const buttonStyles = "w-full px-4 py-3 mt-6 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors duration-300";

  return (
    <section className="flex items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800">회원가입</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" className={inputStyles}
              {...register('email', {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
              })}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div className="mt-4">
            <label htmlFor="name">Name</label>
            <input id="name" type="text" className={inputStyles}
              {...register('name', { required: "Name is required" })}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>
          <div className="mt-4">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" className={inputStyles}
              {...register('password', {
                required: "Password is required",
                minLength: { value: 5, message: "Password must be at least 5 characters" }
              })}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>
          <div>
            <button type="submit" className={buttonStyles}>회원가입</button>
          </div>
          <p className="mt-8 text-xs text-center text-gray-600">
            이미 계정이 있으신가요?{" "}
            <Link to="/login" className="font-semibold text-blue-600 hover:underline">로그인</Link>
          </p>
        </form>
      </div>
    </section>
  )
}

export default RegisterPage
