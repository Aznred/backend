import React, { useState } from "react";
import Home from "./pages/Home";
import FavoritesPage from "./pages/FavoritesPage";
import BarDetails from "./pages/BarDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

export default function App() {
    const [user, setUser] = useState(localStorage.getItem("username") || null);
    const [selectedBar, setSelectedBar] = useState(null);
    const [showFavorites, setShowFavorites] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);


    const handleBarClick = (bar) => {
        setSelectedBar(bar);
        setShowFavorites(false);
        setShowLogin(false);
        setShowSignup(false);
    };
    const handleBackHome = () => {
        setSelectedBar(null);
        setShowFavorites(false);
        setShowLogin(false);
        setShowSignup(false);
    };

    const handleLoginClick = () => {
        setShowLogin(true);
        setShowSignup(false);
        setSelectedBar(null);
        setShowFavorites(false);
    };
    const handleSignupClick = () => {
        setShowSignup(true);
        setShowLogin(false);
        setSelectedBar(null);
        setShowFavorites(false);
    };
    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        setShowFavorites(false);
        setSelectedBar(null);
    };
    const handleAuth = (username) => {
        setUser(username);
        setShowLogin(false);
        setShowSignup(false);
    };

    const handleFavoritesClick = () => {
        setShowFavorites(true);
        setSelectedBar(null);
        setShowLogin(false);
        setShowSignup(false);
    };

    return (
        <>
            {selectedBar ? (
                <BarDetails bar={selectedBar} onBack={handleBackHome} />
            ) : showFavorites ? (
                <FavoritesPage
                    onBarClick={handleBarClick}
                    onBack={handleBackHome}
                />
            ) : showLogin ? (
                <Login onAuth={handleAuth} />
            ) : showSignup ? (
                <Signup onAuth={handleAuth} />
            ) : (
                <Home
                    user={user}
                    onLoginClick={handleLoginClick}
                    onSignupClick={handleSignupClick}
                    onLogoutClick={handleLogout}
                    onBarClick={handleBarClick}
                    onFavoritesClick={handleFavoritesClick}
                />
            )}
        </>
    );
}
