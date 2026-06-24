import "./CustomerPage.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Customer() {

  const [venues, setVenues] = useState([]);
  const navigate = useNavigate();

    useEffect(() => {

        fetch(
            "http://127.0.0.1:8000/api/venues/"
        )
        .then(response => response.json())
        .then(data => {

            console.log(data);

            setVenues(data);

        })
        .catch(error => {
            console.log(error);
        });

    }, []);
  return (
    <div className="dashboard">

      <header className="navbar">
        <h2>VenueBook</h2>

        <div className="nav-links">
          <button>Home</button>
          <button>My Bookings</button>
          <button>Profile</button>
          <button>Logout</button>
        </div>
      </header>

      <div className="welcome">
        <h1>Welcome, Customer</h1>
        <p>Find and book your perfect venue.</p>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search venues..."
        />
        <button>Search</button>
      </div>

      <h2>Featured Venues</h2>

      <div className="venue-grid">

        {venues.map((venue) => (

        <div
            className="venue-card"
            key={venue.id}
        >

            <img
                src={
                  `http://127.0.0.1:8000${venue.image}`
                }
                alt={venue.name}
            />

            <h3>{venue.name}</h3>

            <p>{venue.location}</p>

            <p>₹ {venue.price}</p>

            <button 
                onClick={() =>
                navigate(
                    `/book/${venue.id}`
                )
            }>
                Book Now
            </button>

        </div>

    ))}

        

        

      </div>

      <h2>Booking Statistics</h2>

      <div className="stats">

        <div className="stat-card">
          <h3>8</h3>
          <p>Total Bookings</p>
        </div>

        <div className="stat-card">
          <h3>3</h3>
          <p>Upcoming</p>
        </div>

        <div className="stat-card">
          <h3>5</h3>
          <p>Completed</p>
        </div>

      </div>

    </div>
  );
}

export default Customer;