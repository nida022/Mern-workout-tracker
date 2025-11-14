import { useState } from 'react';

const EditWorkoutForm = ({ workout, onWorkoutUpdated }) => {
  const [title, setTitle] = useState(workout.title);
  const [load, setLoad] = useState(workout.load);
  const [reps, setReps] = useState(workout.reps);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch('http://localhost:4000/api/workouts/${workout._id}' , {
      method: 'PATCH',
      body: JSON.stringify({ title, load, reps }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (onWorkoutUpdated) onWorkoutUpdated(); // This line
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* your inputs */}
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full..." />
      <input type="number" value={load} onChange={(e) => setLoad(e.target.value)} className="w-full..." />
      <input type="number" value={reps} onChange={(e) => setReps(e.target.value)} className="w-full..." />
      <button type="submit" className="w-full bg-green-600...">Update Workout</button>
    </form>
  );
};

export default EditWorkoutForm;