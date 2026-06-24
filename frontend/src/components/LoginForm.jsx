import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginForm() {

    const [username, setUsername] =
        useState("");

    const [password, setPassword] =
        useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {

        const response = await axios.post(
        "http://localhost:8000/api/login/",
        {
            username,
            password
        }
    );
        if(response.data.success){
            localStorage.setItem(
            "access_token",
            response.data.access
            );

            
        

            if(response.data.role==="CUSTOMER"){
                navigate('/user');

            }
            if(response.data.role==="OWNER"){
                navigate('/owner');

            }

            

        }else{
            alert("Invalid credentials")
        }

    };

    return (

        <div>

            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) =>
                    setUsername(e.target.value)
                }
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                    setPassword(e.target.value)
                }
            />

            <button
                onClick={handleLogin}
            >
                Login
            </button>

        </div>

    );

}

export default LoginForm;