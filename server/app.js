const express = require("express");
const path = require("path");
const axios = require("axios");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res, next) => {
  res.render("index");
});

app.post("/", (req, res, next) => {
  let key = process.env.OPEN_API_KEY;
  let data = req.body;
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${data.city}&units=metric&appid=${key}`
    )
    .then((response) => {
      console.log(response.data);
      let data = response.data;
      let x = {
        city: data.name,
        country: data.sys.country,
        temp: data.main.temp,
        wind: data.wind,
      };

      res.render("index", {
        data: {
          calss: data.main.temp > 20 ? "warm" : "cold",
          location: {
            city: data.name,
            country: data.sys.country,
          },
          temp: Math.floor(data.main.temp),
          wind: data.wind,
        },
      });
    })
    .catch((err) => {
      res.render("index", {
        err: "can't find this city try again with a valid city name",
      });
    });
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server Running on http://localhost:${PORT}`)
);
