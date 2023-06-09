const express = require('express');
const app = express();
const db = require('./src/config/config.db');
const morgan = require('morgan');


app.use(morgan('dev'));

///***Require Router Module***///

// const bookmarkRouter = require('./src/routes/bookmark');
// const hospitalRouter = require('./src/routes/hospital');
// const medicalRecordsRouter = require('./src/routes/medical_records');
// const userRouter = require('./src/routes/user');
  const loginRouter = require('./src/routes/login');
  const registerRouter = require('./src/routes/register');
  const homeRouter = require('./src/routes/home');


  ///***Use Router Module***///
// app.use('/api',aidRouter);
// app.use('/api',bookmarkRouter);
// app.use('/api',hospitalRouter);
// app.use('/api',medicalRecordsRouter);
// app.use('/api',userRouter);
app.use('/', homeRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter); 


///***Start Server***///
const port = 8000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})




