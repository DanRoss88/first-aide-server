const express = require("express");
const app = express();

const db = require("./src/config/config.db");
const jwt = require("jsonwebtoken");
const morgan = require("morgan");



///***Require Router Module***///

const userRouter = require("./src/routes/user");
const loginRouter = require("./src/routes/login");
const registerRouter = require("./src/routes/register");
const instructionsRouter = require("./src/routes/instructions");
const mRRouter = require("./src/routes/medical_records");


///***Use Router Module***///
// app.use('/api',aidRouter);
// app.use('/api',bookmarkRouter);
// app.use('/api',hospitalRouter);
// app.use('/api',medicalRecordsRouter);
// app.use('/api',userRouter);

///***Use Middleware***///
app.use(express.json());
app.use(morgan("dev"));


///***Use Router Module***///
app.use("/users", userRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use('/instructions', instructionsRouter);
app.use('/medicalRecords', mRRouter);

///***Start Server***///
const port = 8000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


app.get("/", (req, res) => {
  res.send("Hello World!");
});
