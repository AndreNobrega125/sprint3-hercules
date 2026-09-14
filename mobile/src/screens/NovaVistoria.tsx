import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDataStore } from '../context/dataStore';
import { useAuthStore } from '../context/authStore';
import { Vistoria } from '../types';
import { classifyHeight, getStatusColor, getStatusLabel } from '../utils/status';

export function NovaVistoria() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const user = useAuthStore(state => state.user);

  if (user?.role === 'trabalhador') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>❌</Text>
          <Text style={styles.errorTitle}>Acesso Negado</Text>
          <Text style={styles.errorMessage}>
            Apenas fiscais podem registrar vistorias.
          </Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  const trechos = useDataStore(state => state.trechos);
  const createVistoria = useDataStore(state => state.createVistoria);
  const updateTrechoStatus = useDataStore(state => state.updateTrechoStatus);

  const trechoIdParam: string | undefined = route.params?.trechoId;

  const [step, setStep] = useState<1 | 2 | 3>(trechoIdParam ? 2 : 1);
  const [selectedTrecho, setSelectedTrecho] = useState<string>(trechoIdParam || '');
  const [altura, setAltura] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [fotoCapturada, setFotoCapturada] = useState(false);

  const handleSelectTrecho = (trechoId: string) => {
    setSelectedTrecho(trechoId);
    setStep(2);
  };

  const handleCapturePhoto = () => {
    setFotoCapturada(true);
    setStep(3);
  };

  const handleSubmitVistoria = () => {
    if (!altura.trim()) {
      Alert.alert('Erro', 'Informe a altura da vegetação');
      return;
    }

    const alturaNum = parseFloat(altura);
    if (isNaN(alturaNum)) {
      Alert.alert('Erro', 'Altura deve ser um número válido');
      return;
    }

    if (!selectedTrecho) {
      Alert.alert('Erro', 'Nenhum trecho selecionado');
      return;
    }

    const novoStatus = classifyHeight(alturaNum);

    const vistoria: Vistoria = {
      id: `vistoria-${Date.now()}`,
      trecho_id: selectedTrecho,
      fiscal_id: user?.id || '2',
      data: new Date().toISOString().split('T')[0],
      hora: new Date().toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
      }),
      altura: alturaNum,
      foto_url: fotoCapturada ? 'assets/photo.jpg' : undefined,
      observacoes: observacoes || undefined,
      status: 'concluido',
      coordenadas: {
        latitude: -23.5,
        longitude: -46.8
      }
    };

    createVistoria(vistoria);
    updateTrechoStatus(selectedTrecho, novoStatus, alturaNum);

    Alert.alert('Sucesso', 'Vistoria registrada com sucesso!', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);

    setStep(1);
    setSelectedTrecho('');
    setAltura('');
    setObservacoes('');
    setFotoCapturada(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Nova Vistoria</Text>
          <View style={styles.steps}>
            {[1, 2, 3].map(s => (
              <View
                key={s}
                style={[
                  styles.step,
                  s <= step && styles.stepActive,
                  s === step && styles.stepCurrent
                ]}
              >
                <Text style={styles.stepText}>{s}</Text>
              </View>
            ))}
          </View>
        </View>

        {step === 1 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>1. Selecione o Trecho</Text>

            {trechos.map(trecho => (
              <TouchableOpacity
                key={trecho.id}
                style={[
                  styles.trechoOption,
                  selectedTrecho === trecho.id &&
                    styles.trechoOptionSelected
                ]}
                onPress={() => handleSelectTrecho(trecho.id)}
              >
                <View style={styles.trechoOptionContent}>
                  <Text style={styles.trechoCodigoOption}>{trecho.codigo}</Text>
                  <Text style={styles.trechoEnderecoOption} numberOfLines={1}>
                    {trecho.endereco}
                  </Text>
                  <Text style={styles.trechoMunicipioOption}>
                    {trecho.municipio}
                  </Text>
                </View>
                {selectedTrecho === trecho.id && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}

        {step === 2 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>2. Registrar Foto</Text>

            <View style={styles.photoSection}>
              <TouchableOpacity
                style={[
                  styles.photoButton,
                  fotoCapturada && styles.photoButtonCaptured
                ]}
                onPress={handleCapturePhoto}
              >
                <Text style={styles.photoButtonText}>
                  {fotoCapturada ? '📷 Foto Capturada' : '📷 Capturar Foto'}
                </Text>
              </TouchableOpacity>

              <Text style={styles.photoHint}>
                {fotoCapturada
                  ? 'Foto capturada com sucesso'
                  : 'Tap para capturar foto da vegetação (mockado)'}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.nextButton}
              onPress={() => setStep(3)}
            >
              <Text style={styles.nextButtonText}>Próximo →</Text>
            </TouchableOpacity>
          </View>
        )}

        {step === 3 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>3. Informar Altura</Text>

            <View style={styles.heightSection}>
              <Text style={styles.heightLabel}>Altura da Vegetação (cm)</Text>
              <TextInput
                style={styles.heightInput}
                placeholder="Ex: 25"
                keyboardType="decimal-pad"
                value={altura}
                onChangeText={setAltura}
              />

              {altura && !isNaN(parseFloat(altura)) && (
                <View
                  style={[
                    styles.statusCard,
                    {
                      backgroundColor: getStatusColor(classifyHeight(parseFloat(altura)))
                    }
                  ]}
                >
                  <Text style={styles.statusCardLabel}>Status</Text>
                  <Text style={styles.statusCardValue}>
                    {getStatusLabel(classifyHeight(parseFloat(altura)))}
                  </Text>
                  <Text style={styles.statusCardHeight}>
                    {parseFloat(altura).toFixed(1)}cm
                  </Text>
                </View>
              )}

              <Text style={styles.heightHint}>
                • até 10cm: OK {'\n'}
                • 10-30cm: Atenção {'\n'}
                • acima de 30cm: Crítico
              </Text>
            </View>

            <View style={styles.observacoesSection}>
              <Text style={styles.observacoesLabel}>Observações (opcional)</Text>
              <TextInput
                style={styles.observacoesInput}
                placeholder="Adicionar notas sobre a vegetação..."
                multiline
                value={observacoes}
                onChangeText={setObservacoes}
                maxLength={200}
              />
              <Text style={styles.charCounter}>
                {observacoes.length}/200
              </Text>
            </View>

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmitVistoria}
            >
              <Text style={styles.submitButtonText}>
                Registrar Vistoria
              </Text>
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
    backgroundColor: '#2196f3',
    padding: 20,
    paddingBottom: 24
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12
  },
  steps: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center'
  },
  step: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)'
  },
  stepActive: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderColor: '#fff'
  },
  stepCurrent: {
    backgroundColor: '#fff',
    borderColor: '#fff'
  },
  stepText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196f3'
  },
  section: {
    padding: 16
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12
  },
  trechoOption: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  trechoOptionSelected: {
    borderColor: '#2196f3',
    backgroundColor: '#f0f7ff'
  },
  trechoOptionContent: {
    flex: 1
  },
  trechoCodigoOption: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 3
  },
  trechoEnderecoOption: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2
  },
  trechoMunicipioOption: {
    fontSize: 11,
    color: '#999'
  },
  checkmark: {
    fontSize: 20,
    color: '#2196f3',
    fontWeight: 'bold'
  },
  photoSection: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center'
  },
  photoButton: {
    backgroundColor: '#2196f3',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12
  },
  photoButtonCaptured: {
    backgroundColor: '#4caf50'
  },
  photoButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600'
  },
  photoHint: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center'
  },
  nextButton: {
    backgroundColor: '#2196f3',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center'
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600'
  },
  heightSection: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12
  },
  heightLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8
  },
  heightInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
    marginBottom: 12
  },
  statusCard: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center'
  },
  statusCardLabel: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    opacity: 0.8
  },
  statusCardValue: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4
  },
  statusCardHeight: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600'
  },
  heightHint: {
    fontSize: 11,
    color: '#999',
    lineHeight: 16
  },
  observacoesSection: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12
  },
  observacoesLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8
  },
  observacoesInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#333',
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: 6
  },
  charCounter: {
    fontSize: 11,
    color: '#999',
    textAlign: 'right'
  },
  submitButton: {
    backgroundColor: '#4caf50',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 20
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700'
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  errorText: {
    fontSize: 64,
    marginBottom: 16
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#f44336',
    marginBottom: 8,
    textAlign: 'center'
  },
  errorMessage: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24
  },
  backButton: {
    backgroundColor: '#f44336',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center'
  },
  backButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600'
  }
});
