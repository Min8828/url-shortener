const express = require("express");
const mongoose = require("mongoose");
const app = express();
const ShortUrl = require("./models/shortUrl-modal");

mongoose
  .connect("mongodb://127.0.0.1/urlShortener")
  .then(() => console.log("Connected to MongoDB."))
  .catch((err) => {
    console.log("Connection failed.");
    console.log(err);
  });

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const shortUrls = await ShortUrl.find({});
  res.render("index", { shortUrls });
});

app.post("/shortUrls", async (req, res) => {
  await ShortUrl.create({ full: req.body.fullUrl });
  res.redirect("/");
});

app.listen(process.env.PORT || 8000, () => {
  console.log("Server is running on defalut port 8000.");
});
