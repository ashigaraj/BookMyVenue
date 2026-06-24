import { useParams, useNavigate  } from "react-router-dom";
import { useState } from "react";


function BookingPage() {
    const navigate = useNavigate();

    const { venueId } = useParams();

    const [bookingDate,
        setBookingDate] = useState("");

    const submitBooking = async () => {

        const customerId =
            localStorage.getItem(
                "user_id"
            );

        const response = await fetch(
            "http://127.0.0.1:8000/api/bookings/",
            {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/json"
                },
                body: JSON.stringify({

                    venue_id: venueId,

                    customer_id:
                        customerId,

                    booking_date:
                        bookingDate
                })
            }
        );
        navigate('/customer/dashboard');

        
    };

    return (

        <div>

            <h2>
                Book Venue
            </h2>

            <input
                type="date"
                value={bookingDate}
                onChange={(e)=>
                    setBookingDate(
                        e.target.value
                    )
                }
            />

            <button
                onClick={submitBooking}
            >
                Confirm Booking
            </button>

        </div>
    );
}

export default BookingPage;