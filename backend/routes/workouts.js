const express = require('express');
const router = express.Router();
const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

// GET all workouts
router.get('/', async (req, res) => {
  const workouts = await Workout.find({}).sort({ createdAt: -1 });
  res.status(200).json(workouts);
});

// GET single workout
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid ID' });
  }
  const workout = await Workout.findById(id);
  if (!workout) return res.status(404).json({ error: 'Not found' });
  res.status(200).json(workout);
});

// POST new workout
router.post('/', async (req, res) => {
  const { title, load, reps } = req.body;
  try {
    const workout = await Workout.create({ title, load, reps });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE workout
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }
  const workout = await Workout.findByIdAndDelete(id);
  if (!workout) return res.status(404).json({ error: 'Not found' });
  res.status(200).json(workout);
});

// UPDATE workout (THIS WAS MISSING!)
router.put('/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  const workout = await Workout.findByIdAndUpdate(
    id,
    { ...req.body },
    { new: true }
  );

  if (!workout) {
    return res.status(404).json({ error: 'Workout not found' });
  }

  res.status(200).json(workout);
});

module.exports = router;