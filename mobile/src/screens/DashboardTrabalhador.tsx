import { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Alert
} from 'react-native';
import { useDataStore } from '../context/dataStore';
import { useAuthStore } from '../context/authStore';
import { Intervencao, Trecho } from '../types';
import { StatCard } from '../components/StatCard';

export function DashboardTrabalhador() {
  const user = useAuthStore(state => state.user);
  const intervencoes = useDataStore(state => state.intervencoes);
  const trechos = useDataStore(state => state.trechos);
  const completeIntervencao = useDataStore(state => state.completeIntervencao);

  const stats = useMemo(() => {
    const pendentes = intervencoes.filter(i => i.status === 'pendente');
    const emProgresso = intervencoes.filter(i => i.status === 'em_progresso');
    const concluidas = intervencoes.filter(
      i => i.status === 'concluida' &&
      i.data_conclusao === new Date().toISOString().split('T')[0]
    );

    // Trechos com vistoria registrada: pronto para fazer a roçada
    const prontoParaRocada = pendentes.filter(i => {
      const trecho = trechos.find(t => t.id === i.trecho_id);
      return !!trecho?.data_ultima_vistoria;
    });

    // Trechos sem vistoria: aguardando o fiscal avaliar se precisa de roçada
    const aguardandoFiscal = pendentes.filter(i => {
      const trecho = trechos.find(t => t.id === i.trecho_id);
      return !trecho?.data_ultima_vistoria;
    });

    const trechosParaRocada = pendentes
      .map(int => trechos.find(t => t.id === int.trecho_id))
      .filter((t): t is Trecho => t !== undefined && t.altura_atual > 30);

    return { pendentes, emProgresso, concluidas, prontoParaRocada, aguardandoFiscal, trechosParaRocada };
  }, [intervencoes, trechos]);

  const renderIntervencaoItem = ({ item }: { item: Intervencao }) => {
    const trecho = trechos.find(t => t.id === item.trecho_id);
    const prioridadeColor = {
      alta: '#f44336',
      media: '#ff9800',
      baixa: '#4caf50'
    }[item.prioridade];
    const podeRocar = !!trecho?.data_ultima_vistoria;

    return (
      <View style={styles.intervencaoCard}>
        <View style={styles.intervencaoHeader}>
          <View style={{ flex: 1 }}>
            <Text style={styles.trechoCodigo}>{trecho?.codigo}</Text>
            <Text style={styles.trechoEndereco} numberOfLines={1}>
              {trecho?.endereco}
            </Text>
          </View>
          <View
            style={[
              styles.prioridadeBadge,
              { backgroundColor: prioridadeColor }
            ]}
          >
            <Text style={styles.prioridadeText}>
              {item.prioridade.charAt(0).toUpperCase() + item.prioridade.slice(1)}
            </Text>
          </View>
        </View>
        <View style={styles.intervencaoFooter}>
          <Text style={styles.tipoIntervencao}>
            {item.tipo.charAt(0).toUpperCase() + item.tipo.slice(1)}
          </Text>
          <Text style={styles.dataRecomendada}>
            {item.data_recomendada || 'Monitoramento'}
          </Text>
        </View>
        {podeRocar ? (
          <TouchableOpacity
            style={styles.completeButton}
            onPress={() => {
              completeIntervencao(item.id);
              Alert.alert('Sucesso', 'Roçada marcada como concluída!', [{ text: 'OK' }]);
            }}
          >
            <Text style={styles.completeButtonText}>Marcar Roçada como Concluída</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.waitingBadge}>
            <Text style={styles.waitingBadgeText}>
              ⏳ Aguardando vistoria do fiscal
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Bem-vindo, {user?.nome}!</Text>
          <Text style={styles.role}>Perfil: Equipe de Roçada</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tarefas de Hoje</Text>

          <View style={styles.statGrid}>
            <StatCard value={stats.pendentes.length} label="Pendentes" color="#f44336" />
            <StatCard value={stats.emProgresso.length} label="Em Andamento" color="#ff9800" />
            <StatCard value={stats.concluidas.length} label="Concluída" color="#4caf50" />
          </View>
        </View>

        {stats.prontoParaRocada.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>🌿 Pronto para Roçada</Text>
              <Text style={styles.badgeRed}>{stats.prontoParaRocada.length}</Text>
            </View>
            <FlatList
              scrollEnabled={false}
              data={stats.prontoParaRocada}
              renderItem={renderIntervencaoItem}
              keyExtractor={item => item.id}
            />
          </View>
        )}

        {stats.aguardandoFiscal.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>⏳ Aguardando Vistoria do Fiscal</Text>
              <Text style={styles.badgeOrange}>{stats.aguardandoFiscal.length}</Text>
            </View>
            <FlatList
              scrollEnabled={false}
              data={stats.aguardandoFiscal}
              renderItem={renderIntervencaoItem}
              keyExtractor={item => item.id}
            />
          </View>
        )}

        {stats.emProgresso.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Em Andamento</Text>
              <Text style={styles.badgeOrange}>{stats.emProgresso.length}</Text>
            </View>
            <FlatList
              scrollEnabled={false}
              data={stats.emProgresso}
              renderItem={renderIntervencaoItem}
              keyExtractor={item => item.id}
            />
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações do Trecho</Text>
          <Text style={styles.infoText}>
            Trechos com altura crítica para roçada imediata (acima de 30cm):
          </Text>

          {stats.trechosParaRocada.length > 0 ? (
            <View>
              {stats.trechosParaRocada.map(trecho => (
                <View key={trecho.id} style={styles.trechoInfoCard}>
                  <Text style={styles.trechoCodigoInfo}>{trecho.codigo}</Text>
                  <Text style={styles.trechoAltura}>
                    Altura atual: {trecho.altura_atual}cm
                  </Text>
                  <Text style={styles.trechoMunicipio}>{trecho.municipio}</Text>
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                Nenhum trecho pendente no momento
              </Text>
            </View>
          )}
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
    backgroundColor: '#2e7d32',
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4
  },
  role: {
    fontSize: 12,
    color: '#a5d6a7',
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
  badgeRed: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#f44336',
    backgroundColor: '#ffebee',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4
  },
  badgeOrange: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#ff9800',
    backgroundColor: '#fff3e0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4
  },
  statGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12
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
  prioridadeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginLeft: 8
  },
  prioridadeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold'
  },
  intervencaoFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  tipoIntervencao: {
    fontSize: 11,
    color: '#999',
    fontWeight: '500'
  },
  dataRecomendada: {
    fontSize: 11,
    color: '#666',
    fontWeight: '500'
  },
  completeButton: {
    marginTop: 10,
    backgroundColor: '#2e7d32',
    borderRadius: 6,
    paddingVertical: 8,
    alignItems: 'center'
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600'
  },
  waitingBadge: {
    marginTop: 10,
    backgroundColor: '#fff3e0',
    borderRadius: 6,
    paddingVertical: 8,
    alignItems: 'center'
  },
  waitingBadgeText: {
    color: '#ff9800',
    fontSize: 12,
    fontWeight: '600'
  },
  infoText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 12
  },
  trechoInfoCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#ff9800'
  },
  trechoCodigoInfo: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4
  },
  trechoAltura: {
    fontSize: 12,
    color: '#f44336',
    fontWeight: '500',
    marginBottom: 2
  },
  trechoMunicipio: {
    fontSize: 11,
    color: '#999'
  },
  emptyState: {
    backgroundColor: '#e8f5e9',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center'
  },
  emptyStateText: {
    fontSize: 12,
    color: '#2e7d32',
    fontWeight: '500'
  },
  actionButton: {
    backgroundColor: '#2e7d32',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 20
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600'
  }
});
