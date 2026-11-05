import express from "express";
import cors from "cors";

//app creation
const app = express();

//MiddleWare
app.use(express.json());
app.use(cors());

const PORT = 3000

app.get("/api/player-stats/:userId", (req, res) => {

    res.json({
        "UserId": req.params.userId,
        "Name": "BigDawg",
        "Level": 32,
        "Exp": 12,
        "MaxExp": 32,
        "Gold": 45000,
        "Gems": 235,
    });
})

app.get("/api/health", (req, res) => {
    res.json({
        "Status": "Online",
    });
})

app.listen(PORT, () => {
    console.log("App is listening on port " + PORT);
})