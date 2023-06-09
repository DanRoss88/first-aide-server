const express = require('express');
const app = express();


const port = 8000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})


app.get('/', (req, res) => {
  res.send('Hello World!')
}
)