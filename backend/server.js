require('dotenv').config();  // MUST BE FIRST

const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use('/api/workouts', workoutRoutes);

// Connect to DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
      console.log('Connected to DB & listening on port ${port}');
    });
  })
  .catch((error) => {
    console.log('DB Connection Error:', error);
  });