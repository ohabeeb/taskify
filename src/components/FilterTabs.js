import React from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import theme from '../constants/theme';

export const FILTERS = ['All', 'Active', 'Completed'];

export default function FilterTabs({ selected, onSelect }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        gap: theme.spacing.sm,
      }}>
      {FILTERS.map((filter) => {
        const isActive = selected === filter;

        return (
          <TouchableOpacity
            key={filter}
            onPress={() => onSelect(filter)}
            style={{
              paddingHorizontal: theme.spacing.md,
              paddingVertical: theme.spacing.xs * 2,
              borderRadius: theme.radius.lg,
              backgroundColor: isActive
                ? theme.colors.primary
                : theme.colors.accent,
            }}>
            <Text
              style={{
                ...theme.typography.body,
                fontWeight: '600',
                color: isActive ? theme.colors.white : theme.colors.primary,
              }}>
              {filter}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
