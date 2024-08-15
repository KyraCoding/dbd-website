const express = require("express");
const fetch = require("node-fetch");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000;
app.get("/", (req, res) => {
  res.sendFile(__dirname+"/pages/home.html");
});
app.get("/api", async (req, res) => {
  const filePath = path.join(__dirname, "data", "perks.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "File not found or unable to read file" });
    }
    try {
      const rawData = JSON.parse(data);
      const perkData = rawData.perks;
      const tags = ["generator", "aura"];
      perkData.forEach((perk) => {
        perk.img = `https://cdn.nightlight.gg/img/perks/${perk.img}.png`;
        delete perk.url;
        delete perk.id;
        delete perk.tier;
        perk.tags = [];
        const $ = cheerio.load(perk.description);
        perk.description = $.text();
        tags.forEach((tag) => {
          if (perk.description.indexOf(tag) > -1) {
            perk.tags.push(tag);
          }
        });
      });
      res.type("application/json").json(rawData);
    } catch (parseErr) {
      console.log(parseErr);
      res.status(500).json({ error: "Failed to parse JSON" });
    }
  });
});
app.listen(port, () => {
  console.log(`Server online on ${port}!`);
});
