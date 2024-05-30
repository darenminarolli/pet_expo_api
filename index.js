const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const routes = require('./routes/pet.route.js');

const app = express();
const LOCAL_PORT = 9002;
const PORT =  LOCAL_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/pets', routes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const uri = process.env.DB_CONNECTION_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error('Connection Failed: ', err));


app.get('/', (req, res) => {
  res.send('Hello, world!');
});
