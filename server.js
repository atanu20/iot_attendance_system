const express = require('express');
const app = express();
const port = process.env.PORT || 1000;

app.get('/', (req, res) => {
  res.send('IoT Based Attendance system');
});
app.get('/api', (req, res) => {
  console.log(req.query);
  res.send(req.query);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
