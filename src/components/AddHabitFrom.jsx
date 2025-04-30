import { useState } from "react";
import { addHabit } from "../api";

export default function AddHabitForm({ onHabitAdded }) {
  const [name, setName] = useState("");
  const [completionDate, setCompletionDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newHabit = {
      id: 0,
      name,
      completionDates: [new Date(completionDate).toISOString()],
    };

    try {
      const addedHabit = await addHabit(newHabit);
      onHabitAdded(addedHabit);
      setName("");
      setCompletionDate("");
    } catch (err) {
      console.error("Error adding habit:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-amber-50 p-6 rounded-xl shadow-md mb-8">
      <div className="mb-4">
        <label className="block text-amber-800 font-medium mb-2">Habit Name:</label>
        <input
          type="text"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 rounded-lg border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-amber-50 text-amber-900"
        />
      </div>
      <div className="mb-6">
        <label className="block text-amber-800 font-medium mb-2">Completion Date:</label>
        <input
          type="date"
          value={completionDate}
          required
          onChange={(e) => setCompletionDate(e.target.value)}
          className="w-full p-3 rounded-lg border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-amber-50 text-amber-900"
        />
      </div>
      <button 
        type="submit" 
        className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105"
      >
        Add Habit
      </button>
    </form>
  );
}