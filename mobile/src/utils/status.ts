import { VegetationStatus } from '../types';

export const STATUS_COLORS: Record<VegetationStatus, string> = {
  ok: '#4caf50',
  atencao: '#ff9800',
  critico: '#f44336'
};

export const STATUS_LABELS: Record<VegetationStatus, string> = {
  ok: 'OK',
  atencao: 'ATENÇÃO',
  critico: 'CRÍTICO'
};

export function getStatusColor(status: VegetationStatus): string {
  return STATUS_COLORS[status];
}

export function getStatusLabel(status: VegetationStatus): string {
  return STATUS_LABELS[status];
}

export function classifyHeight(altura: number): VegetationStatus {
  if (altura <= 10) return 'ok';
  if (altura < 30) return 'atencao';
  return 'critico';
}
