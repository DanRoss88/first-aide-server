const express = require('express');
const app = express();
const db = require('./src/config/config.db');

///***Require Router Module***///
// const aidRouter = require('./src/routes/aid');
// const bookmarkRouter = require('./src/routes/bookmark');
// const hospitalRouter = require('./src/routes/hospital');
// const medicalRecordsRouter = require('./src/routes/medical_records');
// const userRouter = require('./src/routes/user');


///***Use Router Module***///
// app.use('/api',aidRouter);
// app.use('/api',bookmarkRouter);
// app.use('/api',hospitalRouter);
// app.use('/api',medicalRecordsRouter);
// app.use('/api',userRouter);


///***Start Server***///
const port = 8000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})


app.get('/', (req, res) => {
  res.send('Hello World!')
}
)