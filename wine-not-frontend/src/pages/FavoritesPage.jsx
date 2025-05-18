import React, { useState, useEffect } from "react";
import "./Home.css";

export default function FavoritesPage({ onBarClick, onBack }) {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        setFavorites(JSON.parse(localStorage.getItem("favorites") || "[]"));
    }, []);

    return (
        <div className="home">
            {/* Header with WineNot logo and Home button */}
            <header className="navbar">
                <span className="logo">🍹 WineNot</span>
                <button
                    className="nav-btn"
                    style={{
                        marginLeft: 20,
                        fontSize: 0,
                        background: "none",
                        border: "none",
                        color: "#222",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        padding: 0
                    }}
                    onClick={onBack}
                    title="Go to Home"
                >
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/61/61972.png"
                        alt="Home"
                        style={{ width: 32, height: 32, display: "block" }}
                    />
                </button>
            </header>
            <section className="section" style={{ maxWidth: 1100, margin: "auto" }}>
                <h2 className="section-title" style={{
                    fontFamily: "Inter, Segoe UI, Arial, sans-serif",
                    fontWeight: 700,
                    fontSize: 38,
                    marginBottom: 35
                }}>Your Favorites</h2>
                <div style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 38,
                    justifyContent: favorites.length > 1 ? "flex-start" : "center"
                }}>
                    {favorites.length === 0 ? (
                        <div style={{ color: "#888", margin: "35px 0", fontSize: 22 }}>No favorites yet.</div>
                    ) : (
                        favorites.map(bar => (
                            <div key={bar.id}
                                 className="fav-uber-card"
                                 style={{
                                     background: "#fff",
                                     borderRadius: 22,
                                     boxShadow: "0 4px 14px 0 #0001",
                                     width: 380,
                                     display: "flex",
                                     flexDirection: "column",
                                     padding: 0,
                                     marginBottom: 20,
                                     transition: "box-shadow 0.2s",
                                     position: "relative"
                                 }}>
                                {/* Bar image */}
                                <div style={{
                                    width: "100%",
                                    height: 170,
                                    borderTopLeftRadius: 22,
                                    borderTopRightRadius: 22,
                                    overflow: "hidden",
                                    background: "#eee"
                                }}>
                                    <img src={bar.image} alt={bar.name}
                                         style={{
                                             width: "100%",
                                             height: "100%",
                                             objectFit: "cover"
                                         }}
                                    />
                                </div>
                                {/* Bar info */}
                                <div style={{ padding: "23px 25px 12px 23px" }}>
                                    <div style={{ fontWeight: 700, fontSize: 21, marginBottom: 7 }}>
                                        {bar.name}
                                    </div>
                                    <div style={{ color: "#666", fontSize: 17, marginBottom: 6 }}>
                                        <span role="img" aria-label="star">⭐</span> {bar.rating} <span style={{ margin: "0 8px" }}>|</span>
                                        <span style={{ color: "#888" }}>{bar.location}</span>
                                    </div>
                                    <div style={{ fontSize: 15, color: "#444", marginBottom: 2 }}>
                                        {bar.alcohols && bar.alcohols.join(", ")}
                                    </div>
                                    <button
                                        className="bar-btn"
                                        style={{
                                            marginTop: 15,
                                            width: "100%",
                                            background: "#111",
                                            color: "#fff",
                                            borderRadius: 11,
                                            fontSize: 16,
                                            fontWeight: 600,
                                            padding: "9px 0",
                                            letterSpacing: 0.2,
                                        }}
                                        onClick={() => onBarClick(bar)}
                                    >View</button>
                                </div>
                                {/* Heart below */}
                                <div style={{
                                    position: "absolute",
                                    bottom: 16,
                                    right: 30,
                                    fontSize: 28,
                                    color: "#D62345",
                                    userSelect: "none"
                                }}>❤️</div>
                            </div>
                        ))
                    )}
                </div>
            </section>
        </div>
    );
}
