import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '../constants/theme';

export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.card,
        borderRadius: theme.radius.md,
        padding: theme.spacing.md,
        marginHorizontal: theme.spacing.md,
        marginBottom: theme.spacing.sm,
        borderWidth: 1,
        borderColor: theme.colors.border,
      }}>
      {/* Checkbox */}
      <TouchableOpacity
        onPress={onToggle}
        style={{ marginRight: theme.spacing.md }}>
        <Ionicons
          name={task.completed ? 'checkbox' : 'square-outline'}
          size={24}
          color={task.completed ? theme.colors.primary : theme.colors.subtext}
        />
      </TouchableOpacity>

      {/* Title */}
      <Text
        onPress={onEdit}
        numberOfLines={2}
        style={{
          flex: 1,
          ...theme.typography.body,
          color: task.completed ? theme.colors.subtext : theme.colors.text,
          textDecorationLine: task.completed ? 'line-through' : 'none',
        }}>
        {task.title}
      </Text>

      {/* Delete */}
      <TouchableOpacity
        onPress={() => {
          Alert.alert(
            'Delete Task',
            'Are you sure you want to delete this task?',
            [
              { text: 'Cancle', style: 'cancel' },
              { text: 'Delete', style: 'destructive', onPress: onDelete },
            ]
          );
        }}
        style={{ marginLeft: theme.spacing.sm }}>
        <Ionicons name="trash-outline" size={20} color={theme.colors.error} />{' '}
      </TouchableOpacity>
    </View>
  );
}
