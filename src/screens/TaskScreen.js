// src/screens/TaskScreen.js

import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import TaskItem from '../components/TaskItem';
import FilterTabs, { FILTERS } from '../components/FilterTabs';
import TaskForm from '../components/TaskForm';
import useTasks from '../hooks/useTasks';
import theme from '../constants/theme';

export default function TaskScreen() {
  const { tasks, addTask, toggleTask, deleteTask, editTask } = useTasks();
  const [selectedFilter, setSelectedFilter] = useState(FILTERS[0]);
  const [formVisible, setFormVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const filteredTasks = tasks.filter((task) => {
    if (selectedFilter === 'Active') return !task.completed;
    if (selectedFilter === 'Completed') return task.completed;
    return true; // 'All'
  });

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;

  function handleAddPress() {
    setEditingTask(null);
    setFormVisible(true);
  }

  function handleEditPress(task) {
    setEditingTask(task);
    setFormVisible(true);
  }

  function handleFormSubmit(title) {
    if (editingTask) {
      editTask(editingTask.id, title);
    } else {
      addTask(title);
    }
    setFormVisible(false);
    setEditingTask(null);
  }

  function handleFormClose() {
    setFormVisible(false);
    setEditingTask(null);
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: theme.colors.background }}>
        {/* Header */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: theme.spacing.md,
            paddingTop: theme.spacing.md,
          }}>
          <View>
            <Text style={{ ...theme.typography.h1, color: theme.colors.text }}>
              Taskify
            </Text>

            <Text
              style={{
                ...theme.typography.caption,
                color: theme.colors.subtext,
                marginTop: theme.spacing.xs,
              }}>
              {completedCount} of {totalCount} completed
            </Text>
          </View>

          <TouchableOpacity
            onPress={handleAddPress}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: theme.colors.primary,
              paddingHorizontal: theme.spacing.md,
              paddingVertical: theme.spacing.xs + 2,
              borderRadius: theme.radius.lg,
              gap: theme.spacing.xs,
            }}>
            <Ionicons name="add-circle" size={20} color={theme.colors.white} />
            <Text
              style={{
                ...theme.typography.body,
                color: theme.colors.white,
                fontWeight: '600',
              }}>
              Add Task
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          <FilterTabs selected={selectedFilter} onSelect={setSelectedFilter} />
        </View>
        <FlatList
          data={filteredTasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              onToggle={() => toggleTask(item.id)}
              onDelete={() => deleteTask(item.id)}
              onEdit={() => handleEditPress(item)}
            />
          )}
          ListEmptyComponent={() => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: theme.spacing.xl * 2,
              }}>
              <Ionicons
                name="checkmark-done-circle-outline"
                size={48}
                color={theme.colors.subtext}
              />
              <Text
                style={{
                  ...theme.typography.h2,
                  color: theme.colors.subtext,
                  marginTop: theme.spacing.md,
                }}>
                No tasks here
              </Text>
            </View>
          )}
          contentContainerStyle={{
            paddingTop: theme.spacing.md,
            paddingBottom: theme.spacing.xl,
          }}
        />

        <TaskForm
          visible={formVisible}
          initialTitle={editingTask ? editingTask.title : ''}
          onSubmit={handleFormSubmit}
          onClose={handleFormClose}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
