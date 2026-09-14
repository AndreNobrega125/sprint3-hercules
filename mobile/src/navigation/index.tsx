import { TouchableOpacity, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { useAuthStore } from '../context/authStore';
import { useNotificationStore } from '../context/notificationStore';

import { LoginScreen } from '../screens/LoginScreen';
import { DashboardGestor } from '../screens/DashboardGestor';
import { DashboardFiscal } from '../screens/DashboardFiscal';
import { DashboardTrabalhador } from '../screens/DashboardTrabalhador';
import { ListaTrechos } from '../screens/ListaTrechos';
import { TrechoDetalhe } from '../screens/TrechoDetalhe';
import { NotificacoesScreen } from '../screens/NotificacoesScreen';
import { NovaVistoria } from '../screens/NovaVistoria';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function getTabColor(role: string) {
  switch (role) {
    case 'gestor':
      return '#1976d2';
    case 'fiscal':
      return '#2196f3';
    case 'trabalhador':
      return '#2e7d32';
    default:
      return '#666';
  }
}

function LogoutButton() {
  const logout = useAuthStore(state => state.logout);

  return (
    <TouchableOpacity onPress={logout} style={{ marginRight: 16 }}>
      <Text style={{ color: '#fff', fontWeight: '600' }}>Sair</Text>
    </TouchableOpacity>
  );
}

function TrechoDetalheRoute({ route }: any) {
  return <TrechoDetalhe trechoId={route.params.trechoId} />;
}

function AppTabsGestor() {
  const user = useAuthStore(state => state.user);
  const notificacoes = useNotificationStore(state => state.notificacoes);
  const unreadCount = notificacoes.filter(n => n.usuario_id === user?.id && !n.lida).length;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: '#1976d2' },
        headerTintColor: '#fff',
        headerRight: LogoutButton,
        tabBarActiveTintColor: '#1976d2',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          height: 60,
          paddingBottom: 8
        }
      }}
    >
      <Tab.Screen
        name="DashboardGestor"
        component={DashboardGestor}
        options={{
          title: 'Dashboard',
          tabBarLabel: 'Dashboard',
          tabBarIcon: () => <Text style={{ fontSize: 20 }}>📊</Text>
        }}
      />
      <Tab.Screen
        name="ListaTrechosTab"
        component={ListaTrechos}
        options={{
          title: 'Trechos',
          tabBarLabel: 'Trechos',
          tabBarIcon: () => <Text style={{ fontSize: 20 }}>🗺️</Text>
        }}
      />
      <Tab.Screen
        name="NotificacoesTab"
        component={NotificacoesScreen}
        options={{
          title: 'Notificações',
          tabBarLabel: 'Notificações',
          tabBarIcon: () => <Text style={{ fontSize: 20 }}>🔔</Text>,
          tabBarBadge: unreadCount > 0 ? unreadCount : undefined
        }}
      />
    </Tab.Navigator>
  );
}

function AppTabsFiscal() {
  const user = useAuthStore(state => state.user);
  const notificacoes = useNotificationStore(state => state.notificacoes);
  const unreadCount = notificacoes.filter(n => n.usuario_id === user?.id && !n.lida).length;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: '#2196f3' },
        headerTintColor: '#fff',
        headerRight: LogoutButton,
        tabBarActiveTintColor: '#2196f3',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          height: 60,
          paddingBottom: 8
        }
      }}
    >
      <Tab.Screen
        name="DashboardFiscal"
        component={DashboardFiscal}
        options={{
          title: 'Dashboard',
          tabBarLabel: 'Dashboard',
          tabBarIcon: () => <Text style={{ fontSize: 20 }}>📊</Text>
        }}
      />
      <Tab.Screen
        name="ListaTrechosTab"
        component={ListaTrechos}
        options={{
          title: 'Trechos',
          tabBarLabel: 'Trechos',
          tabBarIcon: () => <Text style={{ fontSize: 20 }}>🗺️</Text>
        }}
      />
      <Tab.Screen
        name="NotificacoesTab"
        component={NotificacoesScreen}
        options={{
          title: 'Notificações',
          tabBarLabel: 'Notificações',
          tabBarIcon: () => <Text style={{ fontSize: 20 }}>🔔</Text>,
          tabBarBadge: unreadCount > 0 ? unreadCount : undefined
        }}
      />
    </Tab.Navigator>
  );
}

function AppTabsTrabalhador() {
  const user = useAuthStore(state => state.user);
  const notificacoes = useNotificationStore(state => state.notificacoes);
  const unreadCount = notificacoes.filter(n => n.usuario_id === user?.id && !n.lida).length;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: '#2e7d32' },
        headerTintColor: '#fff',
        headerRight: LogoutButton,
        tabBarActiveTintColor: '#2e7d32',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          height: 60,
          paddingBottom: 8
        }
      }}
    >
      <Tab.Screen
        name="DashboardTrabalhador"
        component={DashboardTrabalhador}
        options={{
          title: 'Minhas Tarefas',
          tabBarLabel: 'Tarefas',
          tabBarIcon: () => <Text style={{ fontSize: 20 }}>✓</Text>
        }}
      />
      <Tab.Screen
        name="ListaTrechosTab"
        component={ListaTrechos}
        options={{
          title: 'Trechos',
          tabBarLabel: 'Trechos',
          tabBarIcon: () => <Text style={{ fontSize: 20 }}>🗺️</Text>
        }}
      />
      <Tab.Screen
        name="NotificacoesTab"
        component={NotificacoesScreen}
        options={{
          title: 'Notificações',
          tabBarLabel: 'Notificações',
          tabBarIcon: () => <Text style={{ fontSize: 20 }}>🔔</Text>,
          tabBarBadge: unreadCount > 0 ? unreadCount : undefined
        }}
      />
    </Tab.Navigator>
  );
}

function AppStack() {
  const user = useAuthStore(state => state.user);

  if (!user) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    );
  }

  const getTabsComponent = () => {
    switch (user.role) {
      case 'gestor':
        return AppTabsGestor;
      case 'fiscal':
        return AppTabsFiscal;
      case 'trabalhador':
        return AppTabsTrabalhador;
      default:
        return AppTabsFiscal;
    }
  };

  const TabsComponent = getTabsComponent();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: { fontWeight: '600' },
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: getTabColor(user.role) }
      }}
    >
      <Stack.Screen
        name="AppTabs"
        component={TabsComponent}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TrechoDetalhe"
        component={TrechoDetalheRoute}
        options={{
          title: 'Detalhes do Trecho',
          headerRight: LogoutButton
        }}
      />
      <Stack.Screen
        name="NovaVistoria"
        component={NovaVistoria}
        options={{
          title: 'Registrar Vistoria',
          headerRight: LogoutButton
        }}
      />
    </Stack.Navigator>
  );
}

export function RootNavigator() {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
}
