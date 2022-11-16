import React, { useState } from 'react';
import chair from '../../../assets/images/chair.png';
import background from '../../../assets/images/bg.png';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';

const AppointmentBanner = ({ selectedDate, setSelectedDate }) => {

    return (
        <header>
            <div className="hero mt-14 lg:mt-52"
                style={{ backgroundImage: `url(${background})` }}
            >
                <div className="hero-content flex-col lg:flex-row-reverse pb-8 lg:pb-52">
                    <img src={chair} className="max-w-sm rounded-lg shadow-2xl" alt='dentist chair' />
                    <div className='mr-6
                    '>
                        <DayPicker
                            mode='single'
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AppointmentBanner;