import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import TaskScreen from './src/screens/TaskScreen';

export default function App() {
  useEffect(() => {
    AsyncStorage.clear();
  }, []);

  return <TaskScreen />;
}
