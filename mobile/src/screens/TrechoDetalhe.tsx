import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDataStore } from '../context/dataStore';
import { useAuthStore } from '../context/authStore';
import { Vistoria } from '../types';
import { getStatusColor } from '../utils/status';

interface TrechoDetalheProps {
  trechoId: string;
}

export function TrechoDetalhe({ trechoId }: TrechoDetalheProps) {
  const navigation = useNavigation<any>();
  const user = useAuthStore(state => state.user);
  const trecho = useDataStore(state => state.getTrechoById(trechoId));
  const vistorias = useDataStore(state => state.getVistoriasByTrecho(trechoId));
  const intervencoes = useDataStore(state =>
    state.getIntervencoesByTrecho(trechoId)
  );

  if (!trecho) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Trecho não encontrado</Text>
        </View>
      </SafeAreaView>
    );
  }

  const statusColor = getStatusColor(trecho.status);

  const renderVistoria = ({ item }: { item: Vistoria }) => (
    <View style={styles.vistoriaCard}>
      <View style={styles.vistoriaHeader}>
        <Text style={styles.vistoriaData}>
          {item.data} às {item.hora}
        </Text>
        <Text style={styles.vistoriaAltura}>{item.altura}cm</Text>
      </View>
      <Text style={styles.vistoriaFiscal}>Fiscal: {item.fiscal_id}</Text>
      {item.observacoes && (
        <Text style={styles.vistoriaObs}>{item.observacoes}</Text>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.header, { backgroundColor: statusColor }]}>
          <Text style={styles.codigo}>{trecho.codigo}</Text>
          <Text style={styles.endereco}>{trecho.endereco}</Text>
          <Text style={styles.municipio}>{trecho.municipio}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações do Trecho</Text>

          <View style={styles.infoGrid}>
            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>Altura Atual</Text>
              <Text style={[styles.infoValue, { color: statusColor }]}>
                {trecho.altura_atual}cm
              </Text>
            </View>
            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>Status</Text>
              <Text style={[styles.infoValue, { color: statusColor }]}>
                {trecho.status.toUpperCase()}
              </Text>
            </View>
          </View>

          <View style={styles.detailsGrid}>
            <View style={styles.detailCard}>
              <Text style={styles.detailLabel}>km Início</Text>
              <Text style={styles.detailValue}>
                {trecho.km_inicio.toFixed(1)}
              </Text>
            </View>
            <View style={styles.detailCard}>
              <Text style={styles.detailLabel}>km Fim</Text>
              <Text style={styles.detailValue}>
                {trecho.km_fim.toFixed(1)}
              </Text>
            </View>
            <View style={styles.detailCard}>
              <Text style={styles.detailLabel}>Última Vistoria</Text>
              <Text style={styles.detailValue}>
                {trecho.data_ultima_vistoria || 'Nunca vistoriado'}
              </Text>
            </View>
            <View style={styles.detailCard}>
              <Text style={styles.detailLabel}>Regional</Text>
              <Text style={styles.detailValue}>{trecho.regional}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Histórico de Vistorias ({vistorias.length})
          </Text>

          {vistorias.length > 0 ? (
            <FlatList
              scrollEnabled={false}
              data={vistorias}
              renderItem={renderVistoria}
              keyExtractor={item => item.id}
            />
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                Nenhuma vistoria registrada
              </Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Intervenções ({intervencoes.length})
          </Text>

          {intervencoes.length > 0 ? (
            intervencoes.map(intervencao => (
              <View key={intervencao.id} style={styles.intervencaoCard}>
                <View style={styles.intervencaoHeader}>
                  <Text style={styles.intervencaoTipo}>
                    {intervencao.tipo.charAt(0).toUpperCase() +
                      intervencao.tipo.slice(1)}
                  </Text>
                  <Text
                    style={[
                      styles.intervencaoStatus,
                      {
                        color:
                          intervencao.status === 'concluida'
                            ? '#4caf50'
                            : '#ff9800'
                      }
                    ]}
                  >
                    {intervencao.status.replace('_', ' ').toUpperCase()}
                  </Text>
                </View>
                <Text style={styles.intervencaoData}>
                  Data Recomendada: {intervencao.data_recomendada || 'A definir'}
                </Text>
                <Text style={styles.intervencaoPrioridade}>
                  Prioridade:{' '}
                  {intervencao.prioridade
                    .charAt(0)
                    .toUpperCase() +
                    intervencao.prioridade.slice(1)}
                </Text>
                {intervencao.observacoes && (
                  <Text style={styles.intervencaoObs}>
                    {intervencao.observacoes}
                  </Text>
                )}
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                Nenhuma intervenção registrada
              </Text>
            </View>
          )}
        </View>

        {user?.role !== 'trabalhador' && (
          <View style={styles.actionSection}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('NovaVistoria', { trechoId })}
            >
              <Text style={styles.actionButtonText}>+ Registrar Nova Vistoria</Text>
            </TouchableOpacity>
          </View>
        )}
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
    paddingBottom: 24
  },
  codigo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8
  },
  endereco: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 6
  },
  municipio: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)'
  },
  section: {
    padding: 16,
    marginBottom: 8
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12
  },
  infoGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12
  },
  infoCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center'
  },
  infoLabel: {
    fontSize: 11,
    color: '#999',
    marginBottom: 4,
    fontWeight: '500'
  },
  infoValue: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12
  },
  detailCard: {
    flex: 1,
    minWidth: '48%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12
  },
  detailLabel: {
    fontSize: 11,
    color: '#999',
    marginBottom: 4,
    fontWeight: '500'
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600'
  },
  vistoriaCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#2196f3'
  },
  vistoriaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6
  },
  vistoriaData: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333'
  },
  vistoriaAltura: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2196f3'
  },
  vistoriaFiscal: {
    fontSize: 11,
    color: '#999',
    marginBottom: 4
  },
  vistoriaObs: {
    fontSize: 11,
    color: '#666',
    fontStyle: 'italic'
  },
  intervencaoCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#2e7d32'
  },
  intervencaoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6
  },
  intervencaoTipo: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333'
  },
  intervencaoStatus: {
    fontSize: 12,
    fontWeight: 'bold'
  },
  intervencaoData: {
    fontSize: 11,
    color: '#666',
    marginBottom: 3
  },
  intervencaoPrioridade: {
    fontSize: 11,
    color: '#666',
    marginBottom: 3
  },
  intervencaoObs: {
    fontSize: 11,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 4
  },
  emptyState: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center'
  },
  emptyStateText: {
    fontSize: 12,
    color: '#999'
  },
  actionSection: {
    padding: 16
  },
  actionButton: {
    backgroundColor: '#1976d2',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center'
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600'
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorText: {
    fontSize: 16,
    color: '#f44336'
  }
});
