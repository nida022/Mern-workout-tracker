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
const workoutRoutes = require('./routes/workoutRoutes')  // or './routes/workouts'
app.use('/api/workouts', workoutRoutes)                 // ← MUST BE EXACTLY THIS


// Connect to DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
      console.log('Server running on port ${port}');
    });
  })
  .catch((error) => {
    console.log(`DB Connection Error:`, error);
  });
  // Serve static assets (React build) in production
if (process.env.NODE_ENV === 'production') {
  const path = require('path');

  // Serve the static files from the React app build
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  // Catch all routes and send back index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
  });
}