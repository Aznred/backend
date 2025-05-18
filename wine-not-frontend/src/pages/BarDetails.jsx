import React, { useEffect, useState } from "react";
import "./BarDetails.css";

function getFavs() {
    return JSON.parse(localStorage.getItem("favorites") || "[]");
}
function setFavs(favs) {
    localStorage.setItem("favorites", JSON.stringify(favs));
}
function isFav(bar) {
    const favs = getFavs();
    return favs.some(b => b.id === bar.id);
}
function toggleFav(bar) {
    let favs = getFavs();
    if (isFav(bar)) {
        favs = favs.filter(b => b.id !== bar.id);
    } else {
        favs.push(bar);
    }
    setFavs(favs);
}

function getBarDetailUrl(bar) {
    return `${window.location.origin}/details/${bar.id}`;
}

const alcoholMap = {
    Wine: {
        label: "Glass of wine",
        img: "https://cdn-icons-png.flaticon.com/512/763/763072.png"
    },
    Liquors: {
        label: "Liquor shot",
        img: "https://cdn-icons-png.freepik.com/512/920/920582.png"
    },
    Beer: {
        label: "Pint of beer",
        img: "https://cdn-icons-png.freepik.com/512/988/988934.png"
    },
    Cocktails: {
        label: "House cocktail",
        img: "https://cdn-icons-png.freepik.com/512/4973/4973066.png"
    }
};
const priceRanges = {
    "$": [45, 89],
    "$$": [89, 179],
    "$$$": [180, 350]
};

function getFeaturedItems(bar) {
    if (!bar.alcohols || !Array.isArray(bar.alcohols)) return [];
    const priceRange = priceRanges[bar.price] || [60, 160];
    return bar.alcohols.map((alcohol, idx) => {
        const type = alcoholMap[alcohol];
        if (!type) return null;
        const price = Math.floor(
            Math.random() * (priceRange[1] - priceRange[0]) + priceRange[0]
        );
        return {
            name: type.label,
            img: type.img,
            price: price + " Kč",
            stats: `${80 + Math.floor(Math.random() * 15)}% (${1200 + Math.floor(Math.random() * 1500)})`,
            badge: `#${idx + 1} special`
        };
    }).filter(Boolean);
}

function makeGoogleMapsEmbed(address) {
    const q = encodeURIComponent(address || "Prague");
    return `https://www.google.com/maps?q=${q}&output=embed`;
}
function makeGoogleMapsLink(address) {
    const q = encodeURIComponent(address || "Prague");
    return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

export default function BarDetails({ bar, onBack }) {
    const [details, setDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [favorite, setFavorite] = useState(isFav(bar));

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:3000/api/bars/details/${bar.id}`)
            .then(r => r.json())
            .then(data => {
                setDetails(data.result);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [bar.id]);

    const featured = getFeaturedItems(bar);

    const handleFav = () => {
        toggleFav(bar);
        setFavorite(isFav(bar));
    };

    const handleShare = () => {
        const url = getBarDetailUrl(bar);
        const shareText = `Check out ${bar.name} on WineNot!`;
        if (navigator.share) {
            navigator.share({
                title: bar.name,
                text: shareText,
                url
            });
        } else {
            navigator.clipboard.writeText(url);
            alert("Link copied to clipboard!");
        }
    };

    const gmapEmbed = makeGoogleMapsEmbed(bar.address || bar.location);
    const gmapLink = makeGoogleMapsLink(bar.address || bar.location);

    return (
        <div className="bar-details-bg">
            <div className="bar-details-full">
                <div className="bar-details-img-wrap">
                    <img src={bar.image} alt={bar.name} className="bar-details-img" />
                    <button className="bar-details-back" onClick={onBack}>← Back</button>
                </div>
                <div className="bar-details-main">
                    <div className="bar-details-head">
                        <div>
                            <div className="bar-details-title">
                                {bar.name} <span className="bar-details-neigh">• {bar.location}</span>
                            </div>
                            <div className="bar-details-rating">
                                <b>{bar.rating}★</b> <span className="bar-rating-grey">({bar.reviewCount} reviews)</span>
                                <span className="bar-details-tagsline">
                  {bar.alcohols.map((a) => (
                      <span key={a}>{a}</span>
                  ))}
                                    <span style={{ marginLeft: 8 }}>{bar.price}</span>
                </span>
                            </div>
                            <div className="bar-details-tagsplain">
                                {bar.tags?.map((tag, i) => (
                                    <span key={i} className="bar-tag">{tag}</span>
                                ))}
                            </div>
                        </div>
                        <div className="bar-details-fav">
                            <button
                                className="fav-btn"
                                title={favorite ? "Remove from favorites" : "Add to favorites"}
                                onClick={handleFav}
                                style={{ color: favorite ? "#d23" : "#444", fontSize: 23, marginLeft: 12 }}
                            >
                                {favorite ? "❤️" : "♡"}
                            </button>
                            <button className="share-btn" title="Share this bar" onClick={handleShare} style={{ marginLeft: 12 }}>
                                🔗 Share
                            </button>
                        </div>
                    </div>

                    <div className="bar-details-row">
                        <div className="bar-details-desc">
                            {bar.description || "A friendly bar for all lovers of atmosphere and cocktails."}
                            <div className="bar-details-address">
                                <b>Address: </b> {bar.address || "Prague"}
                            </div>
                            <div className="bar-details-hours">
                                <b>Opening hours: </b> 5:00 PM - 2:00 AM
                            </div>
                        </div>
                        <div className="bar-details-side">
                            <div className="bar-details-map">
                                <a href={gmapLink} target="_blank" rel="noopener noreferrer" title="See on Google Maps">
                                    <iframe
                                        title="Google Map"
                                        src={gmapEmbed}
                                        width="100%"
                                        height="120"
                                        style={{ border: 0, borderRadius: 8 }}
                                        loading="lazy"
                                        allowFullScreen
                                    />
                                </a>
                            </div>
                            <div className="bar-details-sideinfo">
                                <div><b>Address</b> <br />{bar.address || "Prague"}</div>
                                <div style={{ marginTop: 6 }}>Open until 2:00 AM</div>
                            </div>
                        </div>
                    </div>
                </div>

                {featured.length > 0 && (
                    <div className="bar-details-featured">
                        <div className="bar-featured-title">Featured items</div>
                        <div className="bar-featured-list">
                            {featured.map((item, i) => (
                                <div className="bar-featured-card" key={i}>
                                    <img src={item.img} alt={item.name} />
                                    <div className="bar-featured-info">
                                        {item.badge && <span className="bar-featured-badge">{item.badge}</span>}
                                        <div className="bar-featured-name">{item.name}</div>
                                        <div className="bar-featured-meta">
                                            <span>{item.price}</span> · <span>{item.stats}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Google Reviews */}
                {!loading && details && details.reviews && details.reviews.length > 0 && (
                    <div className="bar-details-reviews">
                        <div className="bar-featured-title">Google reviews</div>
                        {details.reviews.slice(0, 5).map((r, i) => (
                            <div key={i} className="review-card">
                                <div className="review-header">
                                    <span className="review-author">{r.author_name}</span>
                                    <span className="review-rating">{r.rating}★</span>
                                </div>
                                <div className="review-text">{r.text}</div>
                                <div className="review-date">{r.relative_time_description}</div>
                            </div>
                        ))}
                        {details.reviews.length > 5 && (
                            <div style={{ fontSize: 14, color: "#555", marginTop: 4 }}>…and {details.reviews.length - 5} more</div>
                        )}
                    </div>
                )}
                {!loading && details && (!details.reviews || details.reviews.length === 0) && (
                    <div className="bar-details-reviews" style={{color:"#888", margin:"20px 0"}}>
                        No Google reviews for this bar.
                    </div>
                )}
            </div>
        </div>
    );
}
