import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'tasks';

export default function useTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const valid = parsed.filter((t) => t && t.id && t.title);
        setTasks(valid);
      }
    } catch (e) {
      // fail silently
    }
  }

  async function saveTasks(updated) {
    setTasks(updated);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      // fail silently
    }
  }

  function addTask(title) {
    const newTask = {
      id: Date.now().toString(),
      title,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    saveTasks([newTask, ...tasks]);
  }

  function toggleTask(id) {
    const updated = tasks.map((t) => {
      return t.id === id ? { ...t, completed: !t.completed } : t;
    });
    saveTasks(updated);
  }

  function deleteTask(id) {
    saveTasks(tasks.filter((t) => t.id !== id));
  }

  function editTask(id, newTitle) {
    const updated = tasks.map((t) => {
      return t.id === id ? { ...t, title: newTitle } : t;
    });
    saveTasks(updated);
  }
  return { tasks, addTask, toggleTask, deleteTask, editTask };
}
