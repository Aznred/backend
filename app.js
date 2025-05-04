const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const barRoutes = require("./routes/barRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/winenot", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


app.get("/", (req, res) => {
    res.send("Bienvenue sur l'API WineNot !");
});

app.use("/api/users", userRoutes);
app.use("/api/bars", barRoutes);
app.use("/api/reviews", reviewRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));