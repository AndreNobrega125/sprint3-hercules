import { View, Text, StyleSheet } from 'react-native';
import { VegetationStatus } from '../types';
import { getStatusColor, getStatusLabel } from '../utils/status';

interface StatusBadgeProps {
  status: VegetationStatus;
  text?: string;
}

export function StatusBadge({ status, text }: StatusBadgeProps) {
  return (
    <View style={[styles.badge, { backgroundColor: getStatusColor(status) }]}>
      <Text style={styles.text}>{text ?? getStatusLabel(status)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    minWidth: 70
  },
  text: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
