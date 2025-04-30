import React, { useEffect, useState } from "react";
import { markHabitDone, getStreak } from "../api";

export default function HabitList({ habits, refreshHabits }) {
  const [streaks, setStreaks] = useState({});

  useEffect(() => {
    habits.forEach(async (habit) => {
      const res = await getStreak(habit.id);
      setStreaks((prev) => ({ ...prev, [habit.id]: res.streak }));
    });
  }, [habits]);

  const handleMarkDone = async (id) => {
    await markHabitDone(id);
    refreshHabits();
  };

  // Function to determine streak display style based on streak length
  const getStreakStyle = (streak) => {
    if (!streak || streak === 0) {
      return "bg-gray-200 text-gray-600";
    } else if (streak < 3) {
      return "bg-amber-100 text-amber-800";
    } else if (streak < 7) {
      return "bg-orange-100 text-orange-800";
    } else {
      return "bg-red-100 text-red-800";
    }
  };

  // Function to get streak emoji based on streak length
  const getStreakEmoji = (streak) => {
    if (!streak || streak === 0) return "🆕";
    if (streak < 3) return "🔥";
    if (streak < 7) return "🔥🔥";
    return "🔥🔥🔥";
  };

  return (
    <div className="bg-amber-50 p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-amber-900 mb-6 pb-2 border-b border-amber-200">
        Your Habits
      </h2>
      <ul className="space-y-4">
        {habits.map((habit) => (
          <li
            key={habit.id}
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border-l-4 border-amber-500"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="min-w-[120px]">
                  <h3 className="text-lg font-semibold text-amber-900">
                    {habit.name}
                  </h3>
                </div>
                
                <div className={`flex items-center px-3 py-1 rounded-full ${getStreakStyle(streaks[habit.id])}`}>
                  <span className="mr-1">{getStreakEmoji(streaks[habit.id])}</span>
                  <span className="font-bold">
                    {streaks[habit.id] || 0} day{streaks[habit.id] !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>
              
              <button
                onClick={() => handleMarkDone(habit.id)}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition-all duration-200 flex items-center"
              >
                <span className="mr-2">✅</span>
                Mark Done
              </button>
            </div>
            
            {/* Streak progress indicator */}
            {streaks[habit.id] > 0 && (
              <div className="mt-3">
                <div className="h-2 bg-amber-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full" 
                    style={{ width: `${Math.min(100, (streaks[habit.id] / 7) * 100)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-amber-600 mt-1">
                  {streaks[habit.id] >= 7 ? "Amazing streak! Keep going!" : 
                   `Keep it up! ${7 - streaks[habit.id]} more days to reach a week!`}
                </p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}