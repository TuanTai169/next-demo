import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { login } from '@/api-services/auth.service';

type Inputs = {
  email: string;
  password: string;
};

export default function Login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const responseData = await login(data);
    if (responseData) {
      localStorage.setItem('accessToken', responseData.access_token);
      localStorage.setItem('role', responseData.user.role);
      router.push('/');
    }
  };

  return (
    <div className="h-full w-[70%] mx-auto my-[5%]">
      <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
        <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
          <img
            src="https://stories.freepiklabs.com/api/vectors/monitor/rafiki/render?color=&background=complete&hide="
            className="w-full"
            alt="Sample image"
          />
        </div>
        <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
          <div className="text-left mb-6">
            <p className="text-4xl font-semibold text-blue-700">Welcome Back!</p>
            <p className="text-gray-400">Login to continue</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="relative">
              <input
                id="email"
                type="email"
                {...register('email', {
                  required: true,
                  pattern: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
                })}
                className="peer h-10 w-full border-b-2  border-gray-300 text-gray-600 placeholder-transparent focus:outline-none focus:border-blue-600 invalid:text-red-500 focus:invalid:border-red-500 focus:invalid:ring-red-500"
                placeholder="demo@gmail.com"
              />
              <label
                htmlFor="email"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-800 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-blue-600 peer-focus:text-sm peer-focus:peer-invalid:text-red-500  "
              >
                Email address
              </label>
            </div>
            {errors.email && (
              <p className="text-red-500" role="alert">
                {errors.email?.type === 'required'
                  ? 'Email is required'
                  : errors.email?.type === 'pattern'
                  ? 'Email is invalid'
                  : null}
              </p>
            )}

            <div className="mt-10 relative">
              <input
                id="password"
                type="password"
                {...register('password', { required: true, min: 4 })}
                minLength={4}
                className="peer h-10 w-full border-b-2  border-gray-300 text-gray-600 placeholder-transparent focus:outline-none focus:border-blue-600 invalid:text-red-500 focus:invalid:border-red-500 focus:invalid:ring-red-500"
                placeholder="Password"
              />
              <label
                htmlFor="password"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-800 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-blue-600 peer-focus:text-sm peer-focus:peer-invalid:text-red-500  "
              >
                Password
              </label>
            </div>
            {errors.password && (
              <p className="text-red-500" role="alert">
                {errors.password?.type === 'required'
                  ? 'Password is required'
                  : errors.password?.type === 'pattern'
                  ? 'Password is invalid'
                  : null}
              </p>
            )}

            {/* <div className="mt-8 flex items-center justify-between md:flex-row sm:flex-col">
              <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                <input
                  className="relative float-left mt-[0.15rem] mr-[6px] -ml-[1.5rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 dark:border-neutral-600 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-blue-600 dark:checked:border-blue-600 checked:bg-blue-600 dark:checked:bg-blue-600 checked:before:opacity-[0.16] checked:after:absolute checked:after:ml-[0.25rem] checked:after:-mt-px checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-t-0 checked:after:border-l-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:ml-[0.25rem] checked:focus:after:-mt-px checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-t-0 checked:focus:after:border-l-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent"
                  type="checkbox"
                  value=""
                  id="rememberMe"
                />
                <label
                  className="inline-block pl-[0.15rem] hover:cursor-pointer"
                  htmlFor="rememberMe"
                >
                  Remember me
                </label>
              </div>
              <a href="#!">Forgot password?</a>
            </div> */}

            <div className="mt-8 text-center w-full lg:text-left">
              <button
                type="submit"
                className="inline-block w-2/5 rounded-full bg-blue-600 pt-3 pb-2.5 text-md font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-blue-600 "
              >
                Login
              </button>
              <p className="mt-2 mb-0 pt-1 text-sm font-semibold">
                <span>{`Don't have an account?`}</span>
                <Link
                  className="text-red-500 ml-2 transition duration-150 ease-in-out hover:text-red-600 focus:text-red-600 active:text-red-700"
                  href="/register"
                >
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
