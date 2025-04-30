import axios from "axios";

const API_URL = "https://localhost:7051/api/Habits";

// Get all habits
export const getHabits = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

// Add new habit
export const addHabit = async (habit) => {
  const res = await axios.post(API_URL, habit);
  return res.data;
};

// Mark a habit done
export const markHabitDone = async (id) => {
  const res = await axios.post(`${API_URL}/${id}/mark`);
  return res.data;
};

// Get streak for a habit
export const getStreak = async (id) => {
  const res = await axios.get(`${API_URL}/${id}/streak`);
  return res.data;
};
