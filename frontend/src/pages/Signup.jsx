import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/signup/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // convert javascript object into json format
          body: JSON.stringify({
            username,
            email,
            phone,
            password,
            role,
          }),
        }
      );

      const data = await response.json();
      
      //if credentials are ok (status code between 200-299)
      if (response.ok) {
        alert(data.message);
        setOtpSent(true);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error(error);
      alert("Unable to connect to server");
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/verify_otp/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            otp,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
         navigate("/login")

        
      } else {
        alert(data.error);
        

      }
    } catch (error) {
      console.error(error);
      alert("Unable to connect to server");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Customer Registration</h2>

        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={styles.input}
            required
          />

          <select
          value={role}
            onChange={(e) => setRole(e.target.value)}
            style={styles.input}
             >
          <option value="customer">Customer</option>
            <option value="owner"> Venue Owner</option>
           </select>

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />

          {!otpSent && (
            <button type="submit" style={styles.button}>
              Send OTP
            </button>
          )}
        </form>

        {otpSent && (
          <div>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              style={styles.input}
            />

            <button
              type="button"
              onClick={handleVerifyOTP}
              style={styles.button}
            >
              Verify OTP
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
    fontFamily: "Arial, sans-serif",
  },

  card: {
    width: "420px",
    padding: "35px",
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
    textAlign: "center",
  },

  heading: {
    marginBottom: "25px",
    color: "#2575fc",
    fontSize: "30px",
    fontWeight: "bold",
  },

  input: {
    width: "100%",
    padding: "14px",
    marginBottom: "18px",
    border: "2px solid #d9d9d9",
    borderRadius: "10px",
    fontSize: "16px",
    outline: "none",
    transition: "0.3s",
    boxSizing: "border-box",
  },

  button: {
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "10px",
    background: "linear-gradient(90deg, #ff6a00, #ee0979)",
    color: "#fff",
    fontSize: "17px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s",
    boxShadow: "0 5px 15px rgba(238,9,121,0.3)",
  },

  secondaryButton: {
    width: "100%",
    padding: "14px",
    marginTop: "12px",
    border: "none",
    borderRadius: "10px",
    background: "linear-gradient(90deg, #36d1dc, #5b86e5)",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s",
  },

  text: {
    marginTop: "18px",
    color: "#555",
    fontSize: "14px",
  },

  link: {
    color: "#ee0979",
    textDecoration: "none",
    fontWeight: "bold",
    cursor: "pointer",
  },
};
export default Signup;