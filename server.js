// get env variables
require("dotenv").config();
const { PORT = 4000, MONGODB_URL } = process.env;

// require express
const express = require("express");
const app = express();

// get mongo schemas
const Items = require("./models/item");
const itemSeed = require("./models/seed");

const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
// const Item = require("./models/item");

mongoose.connect(MONGODB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
mongoose.connection
  .on("open", () => console.log("You are connected to mongoose"))
  .on("close", () => console.log("You are disconnected from mongoose"))
  .on("error", (error) => console.log(error));

app.use(cors()); // to prevent cors errors, open access to all origins
app.use(morgan("dev")); // logging
app.use(express.json()); 

app.get("/", (req, res) => {
  res.redirect('/items')
});
// index page
app.get("/items", async (req, res) => {
  try {
    // send all people
    res.json(await Items.find({}));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});
// item create route
app.post("/items", async (req, res) => {
  try {
    // send all people
    res.json(await Items.create(req.body));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});
// seed data
app.get("/items/seed", (req, res) => {
  Items.deleteMany({}, (error, allItems) => {});

  Items.create(itemSeed, (error, data) => {
    res.redirect("/items");
  });
});
// item delete route
app.delete("/items/:id", async (req, res) => {
  try {
    // send all people
    res.json(await Items.findByIdAndRemove(req.params.id));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});
// items UPDATE ROUTE
app.put("/items/:id", async (req, res) => {
  try {
    // send all people
    res.json(
      await Items.findByIdAndUpdate(req.params.id, req.body, { new: true })
    );
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

app.get("/seed", (req, res) => {
  res.json(itemSeed);
});

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));

