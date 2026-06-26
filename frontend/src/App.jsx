import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Customer from "./pages/CustomerPage";
import CustomerBookings from "./pages/CustomerBookings";
import VenueOwnerDashboard from "./pages/VenueOwnerDashboard";
import BookingPage from "./pages/BookingPage";



function App() {

    return (

        <BrowserRouter>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/customer/dashboard" element={<Customer />} />
                <Route path="/customer/bookings" element={<CustomerBookings />} />
                <Route path="/owner/dashboard" element={<VenueOwnerDashboard />} />
                <Route path="/book/:venueId" element={<BookingPage />} />
            </Routes>
            

        </BrowserRouter>

    );

}

export default App;