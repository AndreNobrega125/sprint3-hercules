import { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  FlatList
} from 'react-native';
import { useDataStore } from '../context/dataStore';
import { useAuthStore } from '../context/authStore';
import { Trecho } from '../types';
import { StatCard } from '../components/StatCard';
import { StatusBadge } from '../components/StatusBadge';

import { useNavigation } from '@react-navigation/native';

export function DashboardFiscal() {
  const navigation = useNavigation<any>();
  const user = useAuthStore(state => state.user);
  const trechos = useDataStore(state => state.trechos);

  const today = new Date().toISOString().split('T')[0];

  const stats = useMemo(() => {
    const total = trechos.length;
    const precisaVistoriar = trechos.filter(t => t.data_ultima_vistoria !== today);
    const vistoriados = trechos.filter(t => t.data_ultima_vistoria === today);
    const criticos = trechos.filter(t => t.status === 'critico');
    const atencao = trechos.filter(t => t.status === 'atencao');

    return { total, precisaVistoriar, vistoriados, criticos, atencao };
  }, [trechos, today]);

  const renderTrechoItem = ({ item }: { item: Trecho }) => {
    return (
      <TouchableOpacity
        style={styles.trechoCard}
        onPress={() => navigation.navigate('TrechoDetalhe', { trechoId: item.id })}
      >
        <View style={styles.trechoHeader}>
          <View style={{ flex: 1 }}>
            <Text style={styles.trechoCodigo}>{item.codigo}</Text>
            <Text style={styles.trechoEndereco} numberOfLines={1}>
              {item.endereco}
            </Text>
          </View>
          <StatusBadge status={item.status} text={`${item.altura_atual}cm`} />
        </View>
        <View style={styles.trechoFooter}>
          <Text style={styles.municipio}>{item.municipio}</Text>
          <Text style={styles.dataVistoria}>
            {item.data_ultima_vistoria ? `Última: ${item.data_ultima_vistoria}` : 'Nunca vistoriado'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Olá, {user?.nome}!</Text>
          <Text style={styles.role}>Perfil: Fiscal de Inspeção</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumo de Hoje</Text>

          <View style={styles.statGrid}>
            <StatCard value={stats.precisaVistoriar.length} label="A Vistoriar" color="#2196f3" />
            <StatCard value={stats.vistoriados.length} label="Hoje" color="#4caf50" />
            <StatCard value={stats.total} label="Total" color="#666" />
          </View>
        </View>

        {stats.precisaVistoriar.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>🔵 Trechos que Preciso Vistoriar</Text>
              <Text style={styles.badgeBlue}>{stats.precisaVistoriar.length}</Text>
            </View>
            <FlatList
              scrollEnabled={false}
              data={stats.precisaVistoriar}
              renderItem={renderTrechoItem}
              keyExtractor={item => item.id}
            />
          </View>
        )}

        {stats.vistoriados.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>✓ Vistoriado Hoje</Text>
              <Text style={styles.badgeGreen}>{stats.vistoriados.length}</Text>
            </View>
            <FlatList
              scrollEnabled={false}
              data={stats.vistoriados}
              renderItem={renderTrechoItem}
              keyExtractor={item => item.id}
            />
          </View>
        )}


        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ações Rápidas</Text>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('NovaVistoria')}
          >
            <Text style={styles.actionButtonText}>+ Nova Vistoria</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#666' }]}
            onPress={() => navigation.navigate('ListaTrechosTab')}
          >
            <Text style={styles.actionButtonText}>Ver Todos os Trechos</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  scrollView: {
    flex: 1
  },
  header: {
    padding: 20,
    backgroundColor: '#2196f3',
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4
  },
  role: {
    fontSize: 12,
    color: '#90caf9',
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 20
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333'
  },
  badgeBlue: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#2196f3',
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4
  },
  badgeGreen: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#4caf50',
    backgroundColor: '#e8f5e9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4
  },
  statGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12
  },
  trechoCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#2196f3'
  },
  trechoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  trechoCodigo: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2
  },
  trechoEndereco: {
    fontSize: 12,
    color: '#666'
  },
  trechoFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  municipio: {
    fontSize: 11,
    color: '#999',
    fontWeight: '500'
  },
  dataVistoria: {
    fontSize: 11,
    color: '#999'
  },
  actionButton: {
    backgroundColor: '#2196f3',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 8
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600'
  }
});
