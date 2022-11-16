import React from 'react';
import chair from '../../../assets/images/chair.png';
import background from '../../../assets/images/bg.png';
import PrimaryButton from '../../../components/PrimaryButton/PrimaryButton';
const Banner = () => {
    const DoctorBackground = {
        backgroundImage: `url(${background})`
    }
    return (
        <div className="hero mt-14 lg:mt-52" style={DoctorBackground}>
            <div className="hero-content flex-col lg:flex-row-reverse pb-8 lg:pb-52">
                <img src={chair} className=" rounded-lg lg:w-1/2 shadow-2xl" alt='' />
                <div>
                    <h1 className="text-5xl font-bold">Your New Smile Starts Here.</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    <PrimaryButton>GET STARTED</PrimaryButton>
                </div>
            </div>
        </div>
    );
};

export default Banner;