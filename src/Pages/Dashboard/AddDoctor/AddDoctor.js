import { async } from '@firebase/util';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';

const AddDoctor = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const imageHostKey = process.env.REACT_APP_imgbb_key;
    const navigate = useNavigate()

    const { data: specialties = [], isLoading } = useQuery({
        queryKey: ['specialty'],
        queryFn: async () => {
            const res = await fetch('https://doctors-portal-server-opal-omega.vercel.app/appointmentSpecialty');
            const data = await res.json();
            return data;
        }
    })

    const handleAddDoctor = (data) => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`

        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then((res) => res.json())
            .then((imgData) => {
                const doctor = {
                    name: data.name,
                    email: data.email,
                    specialty: data.specialty,
                    image: imgData.data.url
                }
                //save doctor information to the database
                fetch('https://doctors-portal-server-opal-omega.vercel.app/doctors', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify(doctor)
                })
                    .then(res => res.json())
                    .then(result => {
                        if (result.acknowledged) {

                            toast.success(`${data.name} is added successfully`)
                            navigate('/dashboard/managedoctors')
                        }
                    })
            })
    }
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className='w-96 p-7'>
            <h2 className="text-4xl">Add A Doctor</h2>


            <form onSubmit={handleSubmit(handleAddDoctor)}>
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
                    <label className="label"><span className="label-text">Specialty</span></label>

                    <select
                        {...register('specialty')}
                        className="select select-bordered w-full max-w-xs">
                        {
                            specialties.map(specialty => <option
                                key={specialty._id}
                                defaultValue={specialty.name}
                            >{specialty.name}</option>)
                        }
                    </select>
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label"><span className="label-text">Photo</span></label>
                    <input
                        type="file"
                        className="input input-bordered w-full max-w-xs"
                        {...register("image", {
                            required: 'photo is required'
                        })}
                    />
                    {errors.img && <p className='text-red-600'>{errors.img?.message}</p>}

                </div>
                <input className='btn btn-accent w-full mt-4' value='Add Doctor' type="submit" />
            </form>
        </div>
    );
};


/**
 * Three places to store images
 * 1. Third party image hosting server 
 * 2. File system of your server
 * 3. mongodb (database)
*/

export default AddDoctor;