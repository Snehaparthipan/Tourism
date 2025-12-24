import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../Utills/API";
import "../CSS/Login.css"


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();


 const handleLogin = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const { data } = await API.post("/login", { email, password });

    // store token
    localStorage.setItem("token", data.token);

    // store user (FROM data.user)
    localStorage.setItem(
      "user",
      JSON.stringify({
        id: data.user.id,
        username: data.user.username,
        email: data.user.email
      })
    );

    navigate("/home");
  } catch (error) {
    setError(error.response?.data?.message || "Login failed");
  }
};


    return (
        
        <div className="login-container">
            <center>
            <form className="login-card" onSubmit={handleLogin}>
                <h2 className="login-title">Welcome Back</h2>
                <p className="login-subtitle">Login to continue</p>


                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    autoComplete="current-email"
                    required
                />


                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                />


                {error && <p className="error-text">{error}</p>}


                <button type="submit" className="login-btn">Login</button>


                <p className="login-footer">
                    Don’t have an account? <Link to="/register">Sign up</Link>
                </p>
            </form>
            </center>
        </div>
    );
}