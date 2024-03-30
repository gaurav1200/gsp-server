const express = require("express");
let cors = require("cors");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const Visit = require("./models/visitsModel");
dotenv.config();
connectDB();
const app = express();

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello World! This is the backend server of GSP");
});
app.post("/visit", async (req, res) => {
  console.log(req.body);
  if (!req.body.data) {
    res.status(400).send("No data sent");
    return;
  }
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
app.get("/visit/:webSiteName", async (req, res) => {
  const webSiteName = req.params.webSiteName;
  const visit = await Visit.findOne({ webSiteName });
  if (visit) {
    res.send(visit);
  } else {
    res.send("No visit found");
  }
});
const PORT = process.env.PORT || 5001;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
