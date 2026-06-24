import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
    
  return (
    <div className="home-container">
      <div className="home-card">
        <img
          src="/logo.png"
          alt="Logo"
          className="logo"
        />

        <h1>Venue Booking System</h1>
        <p>Find and book the perfect venue for your events.</p>

        <div className="button-group">
          <button className="login-btn" 
                onClick={() => navigate("/login")}>Login</button>
          
        </div>
        
      </div>
    </div>
  );
}

export default Home;