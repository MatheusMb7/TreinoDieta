import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import UsuarioScreen from '../screens/UsuarioScreen';

import TreinoLista from '../screens/Treino/TreinoLista';
import TreinoForm from '../screens/Treino/TreinoForm';

import RefeicaoLista from '../screens/Refeicao/RefeicaoLista';
import RefeicaoForm from '../screens/Refeicao/RefeicaoForm';

import ProgressoScreen from '../screens/Progresso/ProgressoScreen';

import { MaterialCommunityIcons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TreinoStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ListaTreinos" component={TreinoLista} options={{ title: 'Treinos' }} />
      <Stack.Screen name="FormTreino" component={TreinoForm} options={{ title: 'Cadastrar/Editar Treino' }} />
    </Stack.Navigator>
  );
}

function RefeicaoStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ListaRefeicoes" component={RefeicaoLista} options={{ title: 'Refeições' }} />
      <Stack.Screen name="FormRefeicao" component={RefeicaoForm} options={{ title: 'Cadastrar/Editar Refeição' }} />
    </Stack.Navigator>
  );
}

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Treinos') iconName = 'dumbbell';
          else if (route.name === 'Refeições') iconName = 'food';
          else if (route.name === 'Progresso') iconName = 'chart-line';

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Treinos" component={TreinoStack} />
      <Tab.Screen name="Refeições" component={RefeicaoStack} />
      <Tab.Screen name="Progresso" component={ProgressoScreen} />
    </Tab.Navigator>
  );
}

export default function StackRoutes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
        <Stack.Screen name="DetalhesUsuario" component={UsuarioScreen} options={{ title: 'Detalhes do Usuário' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
