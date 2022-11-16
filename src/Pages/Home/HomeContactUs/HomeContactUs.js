import React from 'react';
import { Link } from 'react-router-dom';
import PrimaryButton from '../../../components/PrimaryButton/PrimaryButton';
import appointment from '../../../assets/images/appointment.png'

const HomeContactUs = () => {
    return (
        <div className="hero my-10"
            style={{ background: `url(${appointment})` }}
        >
            <div className="card flex-shrink-0 w-full max-w-md my-16">
                <div className='text-center'>
                    <h4 className='text-xl text-primary font-bold'>
                        Contact Us
                    </h4>
                    <h2 className='text-4xl  text-white'>Stay connected with us</h2>
                </div>
                <div className="card-body">
                    <div className="form-control mt-3">
                        <input type="text" placeholder="Email Address" className="input input-bordered" />
                    </div>
                    <div className="form-control mt-3">
                        <input type="text" placeholder="Subject" className="input input-bordered" />
                    </div>
                    <div className="form-control mt-3">
                        <textarea className='rounded-xl pt-3 pl-4' placeholder='Your message' name="" cols="30" rows="5"></textarea>
                    </div>
                    <div className="text-center mt-5
                    ">
                        <PrimaryButton >Summit</PrimaryButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeContactUs;