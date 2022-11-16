import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const handleSignUp = data => {
        console.log(data)
        console.log(errors)
    }
    return (
        <section className='h-[800px] flex justify-center items-center '>
            <div className='w-96 p-7 shadow-2xl rounded-lg'>
                <h2 className='text-xl text-center'>Sign Up</h2>
                <h2 className='text-xl text-center'>mD.sorwaR2.0</h2>
                <form onSubmit={handleSubmit(handleSignUp)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Name</span></label>
                        <input
                            type="text"
                            className="input input-bordered w-full max-w-xs"
                            {...register("name", {
                                required: 'name is required'
                            })}
                        />
                        {errors.name && <p className='text-red-600'>{errors.name?.message}</p>}

                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Email</span></label>
                        <input
                            type="email"
                            className="input input-bordered w-full max-w-xs"
                            {...register("email", {
                                required: 'Password is required'

                            })}
                        />
                        {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Password</span></label>
                        <input
                            type="password"
                            className="input input-bordered w-full max-w-xs"
                            {...register("password", {
                                required: 'password is required',
                                minLength: { value: 6, message: 'Password must be 6 characters long' },
                                pattern: { value: /(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()\-__+.])/, message: 'Password must be strong' }
                            })}
                        />
                        {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                    </div>
                    <input className='btn btn-accent w-full mt-4' value='sign up' type="submit" />
                </form>

                <p>Already have an account<Link className='text-secondary' to='/login'>Please Login</Link></p>
                <div className="divider">OR</div>
                <button className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
            </div>
        </section>
    );
};

export default SignUp;