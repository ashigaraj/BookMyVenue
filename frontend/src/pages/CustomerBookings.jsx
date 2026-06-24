import "./CustomerBookings.css";

function CustomerBookings() {

  const bookings = [
    {
      id: 1,
      venue: "Grand Hall",
      date: "15 Jul 2026",
      time: "10:00 AM",
      guests: 150,
      status: "Confirmed"
    },
    {
      id: 2,
      venue: "Beach Resort",
      date: "20 Jul 2026",
      time: "05:00 PM",
      guests: 75,
      status: "Pending"
    }
  ];

  return (
    <div className="booking-page">

      <header className="navbar">
        <h2>VenueBook</h2>

        <div className="nav-links">
          <button>Home</button>
          <button>My Bookings</button>
          <button>Profile</button>
          <button>Logout</button>
        </div>
      </header>

      <div className="booking-header">
        <h1>My Bookings</h1>
        <p>Manage your venue reservations</p>
      </div>

      <div className="booking-list">

        {bookings.map((booking) => (
          <div
            className="booking-card"
            key={booking.id}
          >

            <h3>{booking.venue}</h3>

            <p>
              <strong>Date:</strong> {booking.date}
            </p>

            <p>
              <strong>Time:</strong> {booking.time}
            </p>

            <p>
              <strong>Guests:</strong> {booking.guests}
            </p>

            <p>
              <strong>Status:</strong>
              <span
                className={`status ${booking.status.toLowerCase()}`}
              >
                {booking.status}
              </span>
            </p>

            <button>
              View Details
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}

export default CustomerBookings;