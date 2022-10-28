const express = require("express");
const cors = require("cors");
const API_KEY = process.env.API_KEY;
const DOMAIN = process.env.DOMAIN;
const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);
const client = mailgun.client({ username: "api", key: API_KEY });
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/send-email", async (req, res) => {
  try {
    const messageData = {
      from: `${req.body.firstname} ${req.body.lastname} <${req.body.email}>`,
      to: "desmontvincent@gmail.com",
      subject: "Mon mail custom",
      text: req.body.message,
    };

    const result = await client.messages.create(DOMAIN, messageData);
    console.log(result);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

app.listen(process.env.PORT, () => {
  console.log("Server has started");
});
