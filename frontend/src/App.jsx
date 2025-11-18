// src/App.jsx
import React, { useEffect, useState } from "react";
import useApi from "./hooks/useApi";
import "./App.css";

function App() {
  const { request, loading, error } = useApi();
  const [workouts, setWorkouts] = useState([]);

  // Move loadWorkouts outside useEffect so the Retry button can use it
  const loadWorkouts = async () => {
    try {
      const data = await request("/api/workouts");
      setWorkouts(data);
    } catch (err) {
      console.error("Failed to load workouts:", err);
    }
  };

  // Load workouts when the app starts
  useEffect(() => {
    loadWorkouts();
  }, []); // empty array = run only once on mount

  // Add new workout
  const addWorkout = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const load = form.load.value;
    const reps = form.reps.value;

    try {
      const newW = await request("/api/workouts", {
        method: "POST",
        body: JSON.stringify({ title, load: Number(load), reps: Number(reps) }),
      });
      setWorkouts([...workouts, newW]);
      form.reset();
    } catch (err) {
      console.error("Add failed:", err);
    }
  };

  // Delete workout
  const deleteWorkout = async (id) => {
    try {
      await request('/api/workouts/${id}', { method: "DELETE" });
      setWorkouts(workouts.filter((w) => w._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // Edit state
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", load: 0, reps: 0 });

  const startEdit = (w) => {
    setEditingId(w._id);
    setEditForm({ title: w.title, load: w.load, reps: w.reps });
  };

  const saveEdit = async () => {
    try {
      const updated = await request('/api/workouts/${editingId}', {
        method: "PUT",
        body: JSON.stringify(editForm),
      });
      setWorkouts(workouts.map((w) => (w._id === editingId ? updated : w)));
      setEditingId(null);
    } catch (err) {
      console.error("Edit failed:", err);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ title: "", load: 0, reps: 0 });
  };

  return (
    <div className="app">
      <h1>My Workouts</h1>

      {/* GLOBAL ERROR */}
      {error && (
        <div className="global-error">
          <strong>Error:</strong> {error}
          <button onClick={loadWorkouts} className="retry">Retry</button>
        </div>
      )}

      {loading && <div className="loading">Loading...</div>}

      {/* ADD FORM */}
      <form onSubmit={addWorkout} className="add-section">
        <input name="title" placeholder="Exercise name" required />
        <input name="load" type="number" placeholder="kg" required />
        <input name="reps" type="number" placeholder="reps" required />
        <button type="submit">Add</button>
      </form>

      {/* WORKOUT LIST */}
      <div className="list">
        {workouts.map((w) => (
          <div key={w._id} className="workout">
            {editingId === w._id ? (
              <div className="edit-form">
                <input
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  placeholder="Title"
                />
                <input
                  type="number"
                  value={editForm.load}
                  onChange={(e) => setEditForm({ ...editForm, load: Number(e.target.value) })}
                  placeholder="kg"
                />
                <input
                  type="number"
                  value={editForm.reps}
                  onChange={(e) => setEditForm({ ...editForm, reps: Number(e.target.value) })}
                  placeholder="reps"
                />
                <button className="save" onClick={saveEdit}>Save</button>
                <button className="cancel" onClick={cancelEdit}>Cancel</button>
              </div>
            ) : (
              <>
                <div className="details">
                  <strong>{w.title || "Untitled"}</strong>
                  <div>Load: {w.load} kg</div>
                  <div>Reps: {w.reps}</div>
                </div>
                <div className="actions">
                  <button className="edit" onClick={() => startEdit(w)}>Edit</button>
                  <button className="delete" onClick={() => deleteWorkout(w._id)}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
        {workouts.length === 0 && !loading && <p className="empty">No workouts yet!</p>}
      </div>
    </div>
  );
}

export default App;