const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/Auth.routes');
const userRoutes = require('./routes/User.routes');
const thumbnailRoutes = require('./routes/Thumbnail.routes');
const singRoutes = require('./routes/Sing.routes');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: false,
}));

app.use('/v1/auth', authRoutes);
app.use('/v1/user', userRoutes);
app.use('/v1/thumbnail', thumbnailRoutes);
app.use('/v1/sing', singRoutes);
(async() => {
  await mongoose.connect(process.env.URL_DB, console.log('Connected database'));
  app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`));
})()