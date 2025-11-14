import { useState } from 'react';

const WorkoutForm = ({ fetchWorkouts }) => {
  const [title, setTitle] = useState('');
  const [load, setLoad] = useState('');
  const [reps, setReps] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const workout = { title, load, reps };

    await fetch('http://localhost:4000/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: { 'Content-Type': 'application/json' }
    });

    setTitle(''); setLoad(''); setReps('');
    fetchWorkouts();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-lg font-medium text-gray-700">Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border-2 border-red-500 rounded-xl text-lg"
          required
        />
      </div>

      <div>
        <label className="block text-lg font-medium text-gray-700">Load:</label>
        <input
          type="number"
          value={load}
          onChange={(e) => setLoad(e.target.value)}
          className="w-full px-4 py-2 border-2 border-red-500 rounded-xl text-lg"
          required
        />
      </div>

      <div>
        <label className="block text-lg font-medium text-gray-700">Reps:</label>
        <input
          type="number"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          className="w-full px-4 py-2 border-2 border-red-500 rounded-xl text-lg"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full mt-6 bg-green-600 text-white font-bold text-xl py-3 rounded-xl hover:bg-green-700 transition-all shadow-lg"
      >
        Add Workout
      </button>
    </form>
    
  );
};

export default WorkoutForm;