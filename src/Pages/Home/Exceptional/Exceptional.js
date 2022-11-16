import React from 'react';
import treatment from '../../../assets/images/treatment.png'
import PrimaryButton from '../../../components/PrimaryButton/PrimaryButton';

const Exceptional = () => {
    return (
        <div className="hero min-h-screen my-32 lg:my-0">
            <div className="hero-content flex-col lg:flex-row lg:mx-20">
                <img src={treatment} className="lg:w-1/3 rounded-lg shadow-2xl lg:mx-16 " alt='' />
                <div className='lg:mx-16'>
                    <h1 className="text-5xl font-bold">Exceptional Dental Care, on Your Terms</h1>
                    <p className="py-6  text-justify">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page</p>
                    <PrimaryButton>Get Started</PrimaryButton>
                </div>
            </div>
        </div>
    );
};

export default Exceptional;