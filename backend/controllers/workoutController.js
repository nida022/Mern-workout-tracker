const Workout = require('../models/workoutModel');

// ---------- GET ALL ----------
const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({}).sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ---------- GET ONE ----------
const getWorkout = async (req, res) => {
  const { id } = req.params;

  try {
    const workout = await Workout.findById(id);
    if (!workout) {
      return res.status(404).json({ error: 'No workout found' });
    }
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ---------- POST (CREATE) ----------
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  // simple validation
  if (!title || !load || !reps) {
    return res
      .status(400)
      .json({ error: 'All fields are required: title, load, reps' });
  }

  try {
    const workout = await Workout.create({
      title,
      load: Number(load),
      reps: Number(reps),
    });
    res.status(201).json(workout);          // 201 = created
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ---------- PATCH (UPDATE) ----------
const updateWorkout = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;                 // {title, load, reps}

  try {
    const workout = await Workout.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!workout) {
      return res.status(404).json({ error: 'No workout found' });
    }
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ---------- DELETE ----------
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  try {
    const workout = await Workout.findByIdAndDelete(id);
    if (!workout) {
      return res.status(404).json({ error: 'No workout found' });
    }
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  updateWorkout,
  deleteWorkout,
};