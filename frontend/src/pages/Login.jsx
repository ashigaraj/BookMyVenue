import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {

  // storing enterd username and password in browser
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
        e.preventDefault();

        try {

            const response = await fetch(
                "http://127.0.0.1:8000/api/login/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password,
                    }),
                }
            );
            
            const data = await response.json();
            

            if (data.success) {

               
                // Store token
                localStorage.setItem(
                    "access_token",
                    data.access
                );
                if(data.role=="customer"){
                     navigate("/customer/dashboard")
                   
                }else{
                  navigate("/owner/dashboard")

                }


            } else {

                alert(data.message);

            }

        } catch (error) {

            console.error(error);
            alert("Server Error");

        }
    };

  
  return (
    
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back</h2>
        <p>Login to continue</p>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="text"
              value={username}
               onChange={(e) =>
                 setUsername(e.target.value)
               }
              placeholder="Enter Username"
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
                   onChange={(e) =>
                  setPassword(
                   e.target.value
               )
               }
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <div className="footer-text">
          Don't have an account? <a href="/signup">Sign Up</a>
        </div>
      </div>
    </div>
  );
}

export default Login;