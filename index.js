const express = require("express");
const app = express();
const db = require("./src/config/config.db");
const jwt = require("jsonwebtoken");
const morgan = require("morgan");

///***Require Router Module***///
// const aidRouter = require('./src/routes/aid');
// const bookmarkRouter = require('./src/routes/bookmark');
// const hospitalRouter = require('./src/routes/hospital');
// const medicalRecordsRouter = require('./src/routes/medical_records');
// const loginRouter = require("./src/routes/login");
// const registerRouter = require("./src/routes/register");
///***Use Router Module***///
// app.use('/api',aidRouter);
// app.use('/api',bookmarkRouter);
// app.use('/api',hospitalRouter);
// app.use('/api',medicalRecordsRouter);
// app.use('/api',userRouter);

const userRouter = require("./src/routes/user");

app.use(express.json());
app.use(morgan("dev"));
app.use("/users", userRouter);
// app.use("/login", loginRouter);
// app.use("/register", registerRouter);

///***Start Server***///
const port = 8000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
