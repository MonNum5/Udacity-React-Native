import * as React from 'react';
import { 
  Text, 
  View,} from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import AddEntry from './Component/AddEntry'



export default function App() {
  return (
    <View>
      <AddEntry />
    </View>
  );
}

