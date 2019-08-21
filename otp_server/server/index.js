const express = require("express");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();
const client = require("twilio")(
  process.env.TWILIO_ACCOUT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);

app.post("/api/sendOTP", (req, res) => {
  const mobile = `+${req.body.mobile}`;
  res.header("Content-Type", "application/json");

  client.verify
    .services("VAad0c4377d007491d6369463b563b6842")
    .verifications.create({ to: mobile, channel: "sms" })
    .then(verification => console.log(verification.status))
    .catch(err => {
      console.log(err);
    });
});
app.post("/api/verifyOTP", (req, res) => {
  const otp = `${req.body.otp}`;
  const mobile = `+${req.body.mobile}`;
  console.log(otp, mobile);
  res.header("Content-Type", "application/json");

  client.verify
    .services("VAad0c4377d007491d6369463b563b6842")
    .verificationChecks.create({ to: mobile, code: otp })
    .then(verification => console.log(verification.status))
    .catch(err => {
      console.log(err);
    });
});

app.listen(3001, () =>
  console.log("Express server is running on localhost:3001")
);
