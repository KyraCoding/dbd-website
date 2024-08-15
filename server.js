const express = require("express");
const fetch = require('node-fetch');
const cheerio = require("cheerio");

const app = express();
const port = 3000;
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/api", async (req, res) => {
  const response = await fetch("https://nightlight.gg/perks/list");
  const html = await response.text();
  const $ = cheerio.load(html);
  
});
app.listen(port, () => {
  console.log(`Server online on ${port}!`);
});
