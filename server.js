const express = require("express");
const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000;
app.get("/", (req, res) => {
  res.send("Hello World!");
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
      const jsonData = JSON.parse(data);

      res.json(jsonData);
    } catch (parseErr) {
      res.status(500).json({ error: "Failed to parse JSON" });
    }
  });
});
app.listen(port, () => {
  console.log(`Server online on ${port}!`);
});
