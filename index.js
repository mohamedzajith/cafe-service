const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const {
  localConnect,
  mongoURI,
  mongodbURL,
  username,
  password,
} = require("./config/keys");
const db = require("./models/index");
const indexRoutes = require("./routes");

if (localConnect) {
  db.mongoose
    .connect(mongodbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      user: username,
      pass: password,
    })
    .then(() => {
      console.log("successfully connected to the database");
    })
    .catch((err) => {
      console.log(err, "error connecting to the database");
    });
} else {
  db.mongoose.connect(mongoURI).then(() => console.log("mongoose connected !"));
}

const app = express();

app.use(bodyParser.json());
app.use(cors());

indexRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Listening on port 5000");
});
