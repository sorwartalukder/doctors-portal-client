import React, { useContext } from 'react';
import { format } from 'date-fns';
import { AuthContext } from '../../../contexts/AuthProvider';
import toast from 'react-hot-toast';

const BookingModal = ({ treatment, setTreatment, refetch, selectedDate }) => {
    const { name, slots, price } = treatment; //treatment is appointment option just different name
    const date = format(selectedDate, 'PP')
    const { user } = useContext(AuthContext)

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
            price,
        }
        // TODO: send data to the server
        //and once data is saved the close tha modal and display success toast
        fetch('https://doctors-portal-server-opal-omega.vercel.app/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success('Booking confirmed')
                    refetch()
                    setTreatment(null)
                }
                else {
                    toast.error(data.message)
                }
            })


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


                        <input name='name' type="text" defaultValue={user?.displayName} disabled placeholder="Your Name" className="input input-bordered w-full " />
                        <input name='email' type="email" defaultValue={user?.email} disabled placeholder="Email Address" className="input input-bordered w-full " />
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