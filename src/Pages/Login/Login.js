import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import useToken from '../../hooks/useToken';

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { signIn } = useContext(AuthContext)
    const [loginError, setLoginError] = useState('')
    const [loginUserEmail, setLoginUserEmail] = useState('')
    const [token] = useToken(loginUserEmail)
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/';

    if (token) {
        navigate(from, { replace: true });
    }
    const handleLogin = data => {
        setLoginError('')
        signIn(data.email, data.password)
            .then((result) => {
                // Signed in 
                const user = result.user;
                setLoginUserEmail(user.email)

            })
            .catch((error) => {
                const errorMessage = error.message;
                setLoginError(errorMessage)
                console.error(error)
            });

    }
    return (
        <section className='h-[800px] flex justify-center items-center '>
            <div className='w-96 p-7 shadow-2xl rounded-lg'>
                <h2 className='text-xl text-center'>Login</h2>
                <h2 className='text-xl text-center'>mD.sorwaR2.0</h2>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Email</span></label>
                        <input
                            type="text"
                            {...register("email",
                                { required: "Email Address is required" }
                            )}
                            className="input input-bordered w-full max-w-xs"
                        />
                        {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Password</span></label>
                        <input
                            type="password"
                            {...register("password",
                                {
                                    required: 'password is required',
                                    minLength: { value: 6, message: 'Password must be 6 characters or longer' }
                                })}
                            className="input input-bordered w-full max-w-xs"
                        />
                        {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                        {loginError && <p className='text-red-600'>{loginError}</p>}
                        <label className="label"><span className="label-text">Forget Password</span></label>
                    </div>
                    <input className='btn btn-accent w-full' value='login' type="submit" />
                </form>

                <p>New to Doctors Portal <Link className='text-secondary' to='/signup'>Create new Account</Link></p>
                <div className="divider">OR</div>
                <button className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
            </div>
        </section>
    );
};

export default Login;