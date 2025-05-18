const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const barRoutes = require("./routes/barRoutes");
app.use("/api/bars", barRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log("Backend lancé sur http://localhost:" + PORT);
});
