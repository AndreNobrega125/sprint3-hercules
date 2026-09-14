import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert
} from 'react-native';
import { useAuthStore } from '../context/authStore';

export function LoginScreen() {
  const [matricula, setMatricula] = useState('');
  const login = useAuthStore(state => state.login);

  const handleLogin = () => {
    if (!matricula.trim()) {
      Alert.alert('Erro', 'Informe sua matrícula');
      return;
    }

    const success = login(matricula);
    if (success) {
      setMatricula('');
    } else {
      Alert.alert(
        'Matrícula não reconhecida',
        'Use G101 (Gestor), F101 (Fiscal) ou T101 (Trabalhador).'
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>VeroAI</Text>
          <Text style={styles.subtitle}>
            Monitoramento Inteligente de Vegetação em Rodovias
          </Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Matrícula</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: G101 (Gestor), F101 (Fiscal), T101 (Trabalhador)"
            placeholderTextColor="#999"
            value={matricula}
            onChangeText={setMatricula}
            autoCapitalize="characters"
            autoCorrect={false}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>

          <View style={styles.info}>
            <Text style={styles.infoTitle}>Contas de Teste:</Text>
            <Text style={styles.infoText}>• Gestor: G101</Text>
            <Text style={styles.infoText}>• Fiscal: F101</Text>
            <Text style={styles.infoText}>• Trabalhador: T101</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  header: {
    alignItems: 'center',
    marginBottom: 40
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 8
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    maxWidth: 280
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 20,
    color: '#333'
  },
  button: {
    backgroundColor: '#1976d2',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 20
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
  info: {
    backgroundColor: '#f0f7ff',
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#1976d2'
  },
  infoTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1976d2',
    marginBottom: 6
  },
  infoText: {
    fontSize: 12,
    color: '#555',
    marginBottom: 3
  }
});
