import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({ path: "./secrets.env"})

const playerStats = new Map();

const DASHBOARD_API_KEY = process.env.DASHBOARD_API_KEY

if (!DASHBOARD_API_KEY){
    console.error("Missing DASHBOARD_API_KEY. Server cannot start.");
    process.exit(1);
}

//app creation
const app = express();

//MiddleWare
app.use(express.json());
app.use(cors());

const PORT = 3000

function isValidNum(num){
    if (Number.isSafeInteger(num) && (num >= 0)) {
        return true;
    } else {
        return false;
    }
}

function authenticateDashboard(req, res, next) {

    if (req.headers["x-api-key"] === DASHBOARD_API_KEY) {

        if (req.body !== null && typeof(req.body) === "object" && !Array.isArray(req.body) && typeof(req.body.name) === "string" && isValidNum(req.body.userId) && isValidNum(req.body.level) && isValidNum(req.body.gold) && isValidNum(req.body.exp) && isValidNum(req.body.maxExp) && isValidNum(req.body.gems)) {
            next()
        } else {
            res.status(400).send('Invalid Data Fields')
        }
    } else {
        res.status(401).send('Unauthorized Access')
    }
}

app.get("/api/player-stats/:userId", (req, res) => {

    const userId = isValidNum(Number(req.params.userId)) ? Number(req.params.userId) : null
    const playerData = playerStats.get(userId)

    if (userId !== null){
        if (playerData === undefined) {
            res.status(404).send('User not found')
        } else {
            res.status(200).json({ "data": playerData})
        }
    } else {
        res.status(400).send('Invalid Id')
    }

    
});

function updateMap(userId, req){
    playerStats.set(userId, {
        "UserId": userId,
        "Name": req.body.name,
        "Level": req.body.level,
        "Exp": req.body.exp,
        "MaxExp": req.body.maxExp,
        "Gold": req.body.gold,
        "Gems": req.body.gems,
    })
}

app.post("/api/player-stats/", authenticateDashboard, (req, res) => {


    const userId = isValidNum(Number(req.body.userId)) ? Number(req.body.userId) : null

    if (userId !== null) {

        const msg = (playerStats.get(userId) === undefined) ? 'User created successfully' : 'User updated successfully'
        updateMap(userId, req)
        res.status(201).json({ message: msg})
        
    } else {
        res.status(400).send('Invalid Id')
    }
  

})

app.get("/api/health", (req, res) => {
    res.json({
        "Status": "Online",
    });
})

app.listen(PORT, () => {
    console.log("App is listening on port " + PORT);
})