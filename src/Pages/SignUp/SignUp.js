import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import toast from 'react-hot-toast';
import useToken from '../../hooks/useToken';

const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { createUser, updateUserProfile } = useContext(AuthContext)
    const [signUpError, setSignUpError] = useState('')
    const [createdUserEmail, setCreatedUserEmail] = useState('')

    const [token] = useToken(createdUserEmail);
    const navigate = useNavigate()
    if (token) {
        navigate('/')
    }
    const handleSignUp = data => {
        setSignUpError('')
        createUser(data.email, data.password)
            .then((result) => {
                toast.success('User Created Successfully.')
                const user = result.user;
                const userInfo = {
                    displayName: data.name
                }
                updateUserProfile(userInfo)
                    .then(() => {
                        saveUser(user.displayName, user.email)
                    })
                    .catch(e => console.error(e))
            })
            .catch((error) => {
                const errorMessage = error.message;
                setSignUpError(errorMessage)
                console.error(error)
            });
    }
    const saveUser = (name, email) => {
        const user = { name, email }
        fetch('https://doctors-portal-server-opal-omega.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log('saveUser', data)
                setCreatedUserEmail(email)

            })
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
                        {signUpError && <p className='text-red-600'>{signUpError}</p>}
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