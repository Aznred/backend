const fs = require('fs');

const alcoholTags = [
    { name: "Beer", emoji: "🍺" },
    { name: "Wine", emoji: "🍷" },
    { name: "Cocktails", emoji: "🍸" },
    { name: "Liquors", emoji: "🥃" }
];
const locations = [
    "Prague 1", "Prague 2", "Prague 3", "Prague 4", "Prague 5",
    "Žižkov", "Vinohrady", "Letná", "Karlín", "Smíchov"
];
const images = [
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/5b/0c/f6/blue-light-bar.jpg?w=900&h=500&s=1",
    "https://cdn.prod.website-files.com/64cffe561f89322c529deabb/64f8f87c632168dd81a91a77_Original.jpg",
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/c4/3f/89/nightmare-horror-bar.jpg?w=500&h=500&s=1",
    "https://images.svoboda-williams.com/frontend/99554657/800x533-z/le-valmont-prague-s-best-bars.jpg",
    "https://images.squarespace-cdn.com/content/v1/608e530428da272d8862478a/1619947474672-8G9SZU1OGVZIG6D6QZI9/london-underground-bar-bg.jpg",
    "https://i.pinimg.com/736x/5d/96/ca/5d96ca4fd76a9e96e1273339ed062108.jpg",
    "https://www.meatspace.cz/site/assets/files/3607/crazy_daisy_bar_prague-meatspace-_dr.jpg",
    "https://www.pragueweekendstours.com/obj/files/6/sys_media_4262.jpg"
];
const prices = ["$", "$$", "$$$"];

function randomAlcohols() {
    let n = Math.floor(Math.random() * 3) + 1;
    let shuffled = alcoholTags.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n).map(a => a.name);
}
function randomLocation() {
    return locations[Math.floor(Math.random() * locations.length)];
}
function randomImage() {
    return images[Math.floor(Math.random() * images.length)];
}
function randomPrice() {
    return prices[Math.floor(Math.random() * prices.length)];
}

const bars = [];

for (let i = 1; i <= 100; i++) {
    bars.push({
        id: i.toString(),
        name: `Bar ${i}`,
        description: `Le Bar ${i} est un spot convivial à ${randomLocation()} où tu peux découvrir les meilleurs alcools de la ville.`,
        image: randomImage(),
        alcohols: randomAlcohols(),
        price: randomPrice(),
        location: randomLocation(),
        rating: Number((4.0 + Math.random() * 1).toFixed(1)),
        reviews: [],
        reviewCount: Math.floor(200 + Math.random() * 8000)
    });
}

fs.writeFileSync('bars.json', JSON.stringify(bars, null, 2), "utf8");
console.log("bars.json (100 bars) généré !");
