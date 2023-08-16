const express = require("express");

const client = require("prom-client");
const collectDefaultMetrics = client.collectDefaultMetrics;
const Registry = client.Registry;
const register = new Registry();
collectDefaultMetrics({ register });

const gauge = new client.Gauge({
  name: "access_accumulator",
  help: "app accumulator",
});

register.registerMetric(gauge);

const app = express();

app.get("/", async (req, res) => {
  gauge.inc();
  res.send(`Successful response. Accumulated ${await getAccumulatedValue()}.`);
});

app.get("/metrics", async (req, res) => {
  res.send(await register.metrics());
});

app.get("/decrease", async (req, res) => {
  if ((await getAccumulatedValue()) > 0) {
    gauge.dec();
  }

  res.send(`Successful response. Accumulated ${await getAccumulatedValue()}.`);
});

app.listen(3000, () => console.log("Example app is listening on port 3000."));

async function getAccumulatedValue() {
  return (await gauge.get()).values[0].value;
}
