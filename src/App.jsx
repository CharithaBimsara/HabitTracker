import { useEffect, useState } from "react";
import AddHabitForm from "./components/AddHabitFrom";
import HabitList from "./components/HabitList";
import { getHabits } from "./api";

function App() {
  const [habits, setHabits] = useState([]);

  const fetchHabits = async () => {
    const data = await getHabits();
    setHabits(data);
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  const handleHabitAdded = () => {
    fetchHabits();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 to-orange-100 p-6 md:p-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-amber-900 mb-2 flex items-center">
          <span className="bg-gradient-to-r from-orange-500 to-red-500 text-transparent bg-clip-text">
            🔥 Habit Tracker
          </span>
        </h1>
        <p className="text-amber-800 mb-8">Build streaks and achieve your goals</p>
        
        <div className="grid gap-8">
          <AddHabitForm onHabitAdded={handleHabitAdded} />
          <HabitList habits={habits} refreshHabits={fetchHabits} />
        </div>
      </div>
    </div>
  );
}

export default App;