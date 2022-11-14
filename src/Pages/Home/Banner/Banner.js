import React from 'react';
import chair from '../../../assets/images/chair.png';
import background from '../../../assets/images/bg.png';
const Banner = () => {
    return (
        <div className="hero mt-52" style={{ backgroundImage: `url(${background})` }}>
            <div className="hero-content flex-col lg:flex-row-reverse pb-52">
                <img src={chair} className=" rounded-lg w-1/2 shadow-2xl" alt='' />
                <div>
                    <h1 className="text-5xl font-bold">Box Office News!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    <button className="btn btn-primary bg-gradient-to-r from-primary to-secondary text-white">Get Started</button>
                </div>
            </div>
        </div>
    );
};

export default Banner;