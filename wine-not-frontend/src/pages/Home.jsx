import React, { useEffect, useState } from "react";
import "./Home.css";

const alcoholEmojis = {
    Beer: "🍺", Wine: "🍷", Cocktails: "🍸", Liquors: "🥃"
};
const priceEmojis = { "$": "", "$$": "", "$$$": "" };

const PAGE_SIZE = 15;

export default function Home({
                                 user,
                                 onLoginClick,
                                 onSignupClick,
                                 onLogoutClick,
                                 onBarClick,
                                 onFavoritesClick
                             }) {
    const [bars, setBars] = useState([]);
    const [selectedAlcohol, setSelectedAlcohol] = useState("");
    const [selectedPrice, setSelectedPrice] = useState("");
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetch("http://localhost:3000/api/bars/maps")
            .then((res) => res.json())
            .then(data => {
                if (Array.isArray(data)) setBars(data);
                else {
                    setBars([]);
                    setError("API error: bad response.");
                }
            })
            .catch(err => {
                setError("API bars error: " + err.message);
                setBars([]);
            });
    }, []);

    useEffect(() => { setCurrentPage(1); }, [selectedAlcohol, selectedPrice, search, bars]);

    if (error) {
        return (
            <div style={{
                color: "#e22",
                padding: "3em",
                fontSize: "1.15em",
                textAlign: "center"
            }}>
                {error}
            </div>
        );
    }

    const allAlcohols = Array.from(
        new Set(
            Array.isArray(bars)
                ? bars.flatMap((bar) => Array.isArray(bar.alcohols) ? bar.alcohols : [])
                : []
        )
    );
    const allPrices = Array.isArray(bars)
        ? Array.from(new Set(bars.map(bar => bar.price)))
        : [];

    let filteredBars = Array.isArray(bars) ? bars : [];
    if (selectedAlcohol)
        filteredBars = filteredBars.filter(
            (bar) => Array.isArray(bar.alcohols) && bar.alcohols.includes(selectedAlcohol)
        );
    if (selectedPrice)
        filteredBars = filteredBars.filter(bar => bar.price === selectedPrice);

    if (search.trim())
        filteredBars = filteredBars.filter(bar =>
            bar.name.toLowerCase().includes(search.trim().toLowerCase())
        );

    const totalPages = Math.ceil(filteredBars.length / PAGE_SIZE);
    const pagedBars = filteredBars.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

    const handleNextPage = () => setCurrentPage(p => Math.min(totalPages, p + 1));
    const handlePrevPage = () => setCurrentPage(p => Math.max(1, p - 1));

    return (
        <div className="home">
            {/* --- Header with logo, search, favorites, login/signup/logout --- */}
            <header className="navbar">
                <span className="logo">🍹 WineNot</span>
                <input
                    type="text"
                    className="header-search"
                    placeholder="Search for a bar…"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                {user && (
                    <button
                        className="nav-btn"
                        style={{ marginLeft: 18 }}
                        onClick={onFavoritesClick}
                    >
                        Favorites
                    </button>
                )}
                <div style={{ marginLeft: "auto" }}>
                    {!user && (
                        <>
                            <button className="nav-btn" onClick={onLoginClick}>Log in</button>
                            <button className="signup-btn" onClick={onSignupClick}>Sign up</button>
                        </>
                    )}
                    {user && (
                        <span style={{ display: "flex", alignItems: "center", gap: 15 }}>
                            <span style={{ fontWeight: 500, color: "#222" }}>Hi, {user}</span>
                            <button className="nav-btn" onClick={onLogoutClick}>Logout</button>
                        </span>
                    )}
                </div>
            </header>

            {/* Filters */}
            <section className="filters">
                {allAlcohols.map((alc) => (
                    <button
                        key={alc}
                        className={`filter-btn${selectedAlcohol === alc ? " active" : ""}`}
                        onClick={() => setSelectedAlcohol(selectedAlcohol === alc ? "" : alc)}
                        style={{ color: "#111" }}
                    >
                        <span style={{ fontSize: 23, marginRight: 5 }}>{alcoholEmojis[alc]}</span> {alc}
                    </button>
                ))}
                {allPrices.map((pr) => (
                    <button
                        key={pr}
                        className={`filter-btn${selectedPrice === pr ? " active" : ""}`}
                        onClick={() => setSelectedPrice(selectedPrice === pr ? "" : pr)}
                        style={{ color: "#111" }}
                    >
                        <span style={{ fontSize: 19, marginRight: 3 }}>{priceEmojis[pr]}</span> {pr}
                    </button>
                ))}
                <button
                    className="filter-btn"
                    onClick={() => { setSelectedAlcohol(""); setSelectedPrice(""); }}
                    style={{ fontWeight: "bold" }}
                >
                    All
                </button>
            </section>

            {/* Main bar grid */}
            <section className="section">
                <h2 className="section-title" style={{ marginBottom: 16 }}>All bars (Google Maps)</h2>
                <div className="cards-list-giant">
                    {pagedBars.length === 0 && (
                        <div style={{ color: "#777", margin: "20px" }}>
                            No bar matches this filter.
                        </div>
                    )}
                    {pagedBars.map((bar) => (
                        <div className="bar-card" key={bar.id}>
                            <img className="bar-img" src={bar.image} alt={bar.name} />
                            <div className="bar-card-body">
                                <div className="bar-name">{bar.name}</div>
                                <div className="bar-info">
                                    <b>{bar.rating}★</b> ({bar.reviewCount}+)&nbsp;• {bar.location}
                                </div>
                                <div style={{ display: "flex", gap: 7 }}>
                                    {bar.alcohols.map(a => (
                                        <span key={a}>{alcoholEmojis[a] || ""} {a}</span>
                                    ))}
                                    <span style={{ marginLeft: "auto" }}>{priceEmojis[bar.price]} {bar.price}</span>
                                </div>
                                <button className="bar-btn" onClick={() => onBarClick(bar)}>
                                    View
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                {totalPages > 1 && (
                    <div style={{ display: "flex", justifyContent: "center", margin: 30, gap: 15 }}>
                        <button disabled={currentPage === 1} onClick={handlePrevPage} className="bar-btn">
                            Previous
                        </button>
                        <span style={{ fontWeight: 600, fontSize: 18 }}>
                            Page {currentPage} / {totalPages}
                        </span>
                        <button disabled={currentPage === totalPages} onClick={handleNextPage} className="bar-btn">
                            Next
                        </button>
                    </div>
                )}
            </section>
        </div>
    );
}
