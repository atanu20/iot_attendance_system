const express = require('express');
const app = express();
const port = 1000;

app.get('/', (req, res) => {
  res.send('IoT Based Attendance system');
});
app.get('/api', (req, res) => {
  console.log(req.query);
  res.send('api');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
