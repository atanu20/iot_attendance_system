const express = require('express');
require('dotenv').config();

const port = process.env.PORT || 1000;
const usertable = require('./models/user');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('IoT Based Attendance system');
});
app.get('/api', async (req, res) => {
  const { data0 } = req.query;
  console.log(data0);
  const newUser = new usertable({
    name: data0,
  });

  await newUser.save();
  res.send(req.query);
});

const URI = process.env.MONGODB_URL;
mongoose.connect(
  URI,
  {
    useNewUrlParser: true,

    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log('Connected to mongodb');
  }
);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
