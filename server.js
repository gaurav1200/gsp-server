const express = require("express");
let cors = require("cors");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const Visit = require("./models/visitsModel");
dotenv.config();
connectDB();
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.post("/visit", async (req, res) => {
  console.log(req.body);
  const { webSiteName, count } = req.body.data;
  const visit = await Visit.findOne({ webSiteName });
  if (visit) {
    visit.count += count;
    visit.lastVisit = new Date();
    await visit.save();
  } else {
    const visit = await Visit.create({
      webSiteName,
      count,
      lastVisit: new Date(),
    });
    await visit.save();
  }
  res.send("Visit logged");
});
app.get("/", (req, res) => {
  res.send("API is running...");
});
const PORT = process.env.PORT || 5001;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
