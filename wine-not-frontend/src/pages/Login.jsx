import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import "./Auth.css";

export default function Login({ onAuth }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        fetch("http://localhost:3000/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) setError(data.error);
                else {
                    setError("");
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("username", data.username);
                    onAuth(data.username);
                }
            });
    };

    const handleGoogleSuccess = (credentialResponse) => {
        fetch("http://localhost:3000/api/users/google-login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ credential: credentialResponse.credential }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) setError(data.error);
                else {
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("username", data.username);
                    onAuth(data.username);
                }
            });
    };

    return (
        <div className="auth-bg">
            <div className="auth-logo-bar" style={{ background: "#fff", color: "#111", borderBottom: "1.5px solid #eee" }}>
                <span className="auth-logo" style={{ fontFamily: "Inter, Segoe UI, Arial, sans-serif" }}>
                    <b>Wine</b>Not
                </span>
            </div>
            <form className="auth-box" onSubmit={handleLogin}>
                <div className="auth-title">
                    Log in to your WineNot account
                </div>
                <input
                    className="auth-input"
                    placeholder="Username or email"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                />
                <input
                    className="auth-input"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <button className="auth-btn-black" type="submit">Continue</button>

                <div className="auth-or"><span>or</span></div>

                <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => setError("Google sign-in failed")}
                    shape="pill"
                    width="100%"
                    text="signin_with"
                    locale="en"
                />

                {error && <div style={{ color: "red", marginTop: 18, fontSize: 14 }}>{error}</div>}

                <div className="auth-terms">
                    By continuing, you agree to our terms of service.
                </div>
            </form>
        </div>
    );
}
