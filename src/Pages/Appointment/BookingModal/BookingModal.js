import React from 'react';
import { format } from 'date-fns';

const BookingModal = ({ treatment, setTreatment, selectedDate }) => {
    const { name, slots } = treatment; //treatment is appointment option just different name
    const date = format(selectedDate, 'PP')

    const handleBooking = event => {
        event.preventDefault()
        const form = event.target;
        const slot = form.slot.value;
        const patient = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const booking = {
            appointmentDate: date,
            treatment: name,
            patient,
            slot,
            email,
            phone,
        }
        // TODO: send data to the server
        //and once data is saved the close tha modal and display success toast
        console.log(booking)
        setTreatment(null)
    }
    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{name}</h3>
                    <form
                        onSubmit={handleBooking}
                        className='grid grid-cols-1 gap-3 mt-10'
                    >
                        <input type="text" value={date} disabled className="input input-bordered w-full " />

                        <select name='slot' className="select select-bordered w-full">
                            {
                                slots.map((slot, index) => <option
                                    key={index}
                                    value={slot}
                                >
                                    {slot}
                                </option>)
                            }
                        </select>

                        <input name='name' type="text" placeholder="Your Name" className="input input-bordered w-full " />
                        <input name='email' type="email" placeholder="Email Address" className="input input-bordered w-full " />
                        <input name='phone' type="text" placeholder="Phone Number" className="input input-bordered w-full " />
                        <br />
                        <input className='btn btn-accent w-full ' type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;