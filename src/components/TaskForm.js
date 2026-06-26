import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity } from 'react-native';
import theme from '../constants/theme';

export default function TaskForm({
  visible,
  initialTitle = '',
  onSubmit,
  onClose,
}) {
  const [title, setTitle] = useState(initialTitle);

  useEffect(() => {
    setTitle(initialTitle);
  }, [initialTitle, visible]);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          backgroundColor: 'rgba(0,0,0,0.4)',
        }}>
        <View
          style={{
            backgroundColor: theme.colors.card,
            borderTopLeftRadius: theme.radius.lg,
            borderTopRightRadius: theme.radius.lg,
            padding: theme.spacing.lg,
          }}>
          <Text
            style={{
              ...theme.typography.h2,
              color: theme.colors.text,
              marginBottom: theme.spacing.md,
            }}>
            {initialTitle ? 'Edit Task' : 'New Task'}
          </Text>

          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="What needs to be done?"
            placeholderTextColor={theme.colors.subtext}
            autoFocus
            style={{
              borderWidth: 1,
              borderColor: theme.colors.border,
              borderRadius: theme.radius.md,
              padding: theme.spacing.md,
              ...theme.typography.body,
              color: theme.colors.text,
              marginBottom: theme.spacing.lg,
            }}
          />

          <View style={{ flexDirection: 'row', gap: theme.spacing.md }}>
            <TouchableOpacity
              onPress={onClose}
              style={{
                flex: 1,
                padding: theme.spacing.md,
                borderRadius: theme.radius.md,
                backgroundColor: theme.colors.accent,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  ...theme.typography.body,
                  fontWeight: '600',
                  color: theme.colors.primary,
                }}>
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                if (title.trim()) {
                  onSubmit(title.trim());
                }
              }}
              style={{
                flex: 1,
                padding: theme.spacing.md,
                borderRadius: theme.radius.md,
                backgroundColor: theme.colors.primary,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  ...theme.typography.body,
                  fontWeight: '600',
                  color: theme.colors.white,
                }}>
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
