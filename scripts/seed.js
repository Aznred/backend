// backend/scripts/seed.js

const mongoose = require("mongoose");
const Bar = require("../models/bar");
const Review = require("../models/review");

mongoose.connect("mongodb://localhost:27017/winenot", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

async function seed() {
    await Bar.deleteMany({});
    await Review.deleteMany({});

    // Exemples d'images libres (Unsplash, etc.)
    const images = [
        "https://images.unsplash.com/photo-1514361892635-cebbf9a2c3c6",
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        "https://images.unsplash.com/photo-1526178613658-3f1622045557",
        "https://images.unsplash.com/photo-1519864600265-abb224a01e04",
        "https://images.unsplash.com/photo-1464983953574-0892a716854b"
    ];

    const bars = [
        {
            name: "Bar des Amis",
            description: "Un bar convivial avec cocktails maison.",
            image: images[0],
            tags: ["Cocktails", "Ambiance", "Pas cher"],
            location: "Prague 1",
            rating: 4.8
        },
        {
            name: "Le 129",
            description: "Un bar à vins chic avec tapas.",
            image: images[1],
            tags: ["Wine Bars", "Tapas", "Chic"],
            location: "Prague 2",
            rating: 4.9
        },
        {
            name: "Happy Hour Pub",
            description: "Le rendez-vous des étudiants pour boire pas cher.",
            image: images[2],
            tags: ["Pubs", "Pas cher", "Etudiant"],
            location: "Prague 3",
            rating: 4.5
        },
        {
            name: "Cocktail Factory",
            description: "Des cocktails incroyables et DJ tous les week-ends.",
            image: images[3],
            tags: ["Cocktails", "Ambiance", "DJ"],
            location: "Prague 4",
            rating: 4.7
        },
        {
            name: "Wine & Tapas",
            description: "Ambiance espagnole, vins et tapas.",
            image: images[4],
            tags: ["Wine Bars", "Tapas", "Ambiance"],
            location: "Prague 1",
            rating: 4.8
        }
    ];

    for (const bar of bars) {
        await Bar.create(bar);
    }

    console.log("Bars added !");
    mongoose.disconnect();
}

seed();
