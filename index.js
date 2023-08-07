const express = require("express");

const app = express();

let counter = 0;

app.get("/", (req, res) => {
  counter = counter + 1;
  res.send(`Successful response. Accessed ${counter} times.`);
});

app.get("/metrics", (req, res) => {
  res.send(JSON.stringify({ accessCounter: counter }));
});

app.listen(3000, () => console.log("Example app is listening on port 3000."));
