const express = require("express");
const app = express();
const database = require("./src/config/config.db");
const jwt = require("jsonwebtoken");
const morgan = require("morgan");
require("dotenv").config();

///***Require Router Module***///

const userRouter = require("./src/routes/user");
const instructionsRouter = require("./src/routes/instructions");
const mRRouter = require("./src/routes/medical_records");
const bookmarkRouter = require("./src/routes/bookmark");
const hospitalRouter = require("./src/routes/hospital");
const emergContRouter = require("./src/routes/emergency_contact");

///***Use Middleware***///
app.use(express.json());
app.use(morgan("dev"));
app.use(authenticateToken);

///***Use Router Module***///
app.use("/users", userRouter);
app.use("/instructions", instructionsRouter);
app.use("/medicalRecords", mRRouter);
app.use("/bookmarks", bookmarkRouter);
app.use("/hospitals", hospitalRouter);
app.use("/emergencyContacts", emergContRouter);

///***Start Server***///
const port = 8000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.get("/test", (req, res) => {
  res.send("Hello " + req.payload.name);
});

app.post("/login", async (req, res) => {
  const email = req.body.email.toLowerCase();

  // check if email exists in database
  const user = await database.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  if (user.rows.length === 0) {
    return res.status(401).json({ error: "User does not exist." });
  }

  // email exists :)
  const payload = {
    user_id: user.rows[0].id,
    email: user.rows[0].email,
    name: user.rows[0].username,
  };

  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
  res.json({ accessToken: accessToken });
});

app.post("/register", async (req, res) => {
  try {
    const { username, email, city } = req.body;

    let lowerCaseEmail = email.toLowerCase();

    // Check if user already exists
    const user = await database.query("SELECT * FROM users WHERE email = $1", [
      lowerCaseEmail,
    ]);
    if (user.rows.length > 0) {
      return res.status(401).json({ error: "User already exists." });
    }

    // Retrieve city information
    const cityResult = await database.query(
      "SELECT * FROM city WHERE name = $1",
      [city]
    );
    if (cityResult.rows.length === 0) {
      return res.status(401).json({ error: "City does not exist." });
    }

    const cityId = cityResult.rows[0].id;

    // Insert new user
    const newUser = await database.query(
      "INSERT INTO users (username, email, city_id) VALUES ($1, $2, $3) RETURNING *",
      [username, lowerCaseEmail, cityId]
    );

    const createdUser = await database.query(
      "SELECT * FROM users WHERE email = $1",
      [lowerCaseEmail]
    );

    // create new medical record for new user
    const newMedicalRecord = await database.query(
      "INSERT INTO medical_records (users_id) VALUES ($1) RETURNING *",
      [createdUser.rows[0].id]
    );

    const payload = {
      user_id: createdUser.rows[0].id,
      email: createdUser.rows[0].email,
      name: createdUser.rows[0].username,
    };

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
    res.json({ accessToken: accessToken });
  } catch (error) {
    res.status(500).json({ error: "Failed to create user.", problem: error });
  }
});

function authenticateToken(req, res, next) {
  if (req.path === "/login" || req.path === "/register") {
    return next();
  }

  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) return res.sendStatus(403);
    req.payload = payload;
    next();
  });
}
