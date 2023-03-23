import Link from 'next/link';
import router from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { signUp } from '@/api-services/auth.service';

type Inputs = {
  fullName: string;
  email: string;
  password: string;
};

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await signUp(data);
    router.push('/login');
  };
  return (
    <div className="h-full  w-[70%] mx-auto my-[5%]">
      <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between lg:flex-row-reverse">
        <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
          <img
            src="https://stories.freepiklabs.com/api/vectors/mobile-login/rafiki/render?color=&background=complete&hide="
            className="w-full"
            alt="Sample image"
          />
        </div>
        <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
          <div className="text-left mb-6">
            <p className="text-3xl lg:text-4xl font-semibold text-blue-700">
              Explore your knowledge
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="relative">
              <input
                id="fullName"
                {...register('fullName', { required: true })}
                type="text"
                className="peer h-10 w-full border-b-2  border-gray-300 text-gray-600 placeholder-transparent focus:outline-none focus:border-blue-600 invalid:text-red-500 focus:invalid:border-red-500 focus:invalid:ring-red-500"
                placeholder="Nguyen Van A"
                minLength={4}
              />
              <label
                htmlFor="fullName"
                className="absolute left-0 -top-3.5 after:content-['*'] after:ml-0.5 after:text-red-500 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-800 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-blue-600 peer-focus:text-sm peer-focus:peer-invalid:text-red-500  "
              >
                Full Name
              </label>
            </div>
            {errors.fullName?.type === 'required' && (
              <p className="text-red-500" role="alert">
                Full Name is required
              </p>
            )}

            <div className="mt-10 relative">
              <input
                id="email"
                {...register('email', {
                  required: true,
                  pattern: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
                })}
                type="email"
                className="peer h-10 w-full border-b-2  border-gray-300 text-gray-600 placeholder-transparent focus:outline-none focus:border-blue-600 invalid:text-red-500 focus:invalid:border-red-500 focus:invalid:ring-red-500"
                placeholder="demo@gmail.com"
              />
              <label
                htmlFor="email"
                className="absolute  left-0 -top-3.5 after:content-['*'] after:ml-0.5 after:text-red-500 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-800 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-blue-600 peer-focus:text-sm peer-focus:peer-invalid:text-red-500  "
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
                className="absolute left-0 -top-3.5 after:content-['*'] after:ml-0.5 after:text-red-500 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-800 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-blue-600 peer-focus:text-sm peer-focus:peer-invalid:text-red-500  "
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

            <div className="mt-8 text-center w-full lg:text-left">
              <button
                type="submit"
                className="inline-block w-2/5 rounded-full bg-blue-600 pt-3 pb-3 text-md font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-blue-600 "
              >
                Register
              </button>
              <p className="mt-2 mb-0 pt-1 text-sm font-semibold">
                <span>{`Already have an account?`}</span>
                <Link
                  className="text-red-500 ml-2 transition duration-150 ease-in-out hover:text-red-600 focus:text-red-600 active:text-red-700"
                  href="/login"
                >
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
