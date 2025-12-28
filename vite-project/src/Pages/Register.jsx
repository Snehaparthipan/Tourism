import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import API from '../Utills/API';
import '../CSS/registar.css'

export default function Register() {
    const navigate = useNavigate()
    const [name , setName] = useState('')
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')

    const handleRegister = async (e)=>{
        e.preventDefault()
        try {
                await API.post("/register" , {
                username : name , email , password,
            })
            alert("Registered Successfully")
            navigate('/')
        } catch (error) {
            alert(error.response?.data?.message || "Registration failed")
        }
    }
  return (
    <div className="auth-wrapper">
  <form className="auth-card" onSubmit={handleRegister}>
    <h2 className="auth-title">Create Account</h2>
    <p className="auth-subtitle">Register to continue</p>

    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Full name"
      required
    />

    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Email address"
      required
    />

    <input
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="Password"
      required
    />

    <button type="submit" className="auth-btn">Sign up</button>

    <p className="auth-footer">
      Already have an account? <Link to="/">Login</Link>
    </p>
  </form>
</div>

  )
}