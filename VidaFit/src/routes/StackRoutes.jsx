import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/Usuario/Homescreen';
import UsuarioScreen from '../screens/Usuario/UsuarioScreen';
// Usuários
import FormUsuario from '../screens/Usuario/FormUsuario';


// Treinos
import TreinoLista from '../screens/Treino/TreinoLista';  
import FormTreino from '../screens/Treino/TreinoForm';

// Refeições
import RefeicaoLista from '../screens/Refeicao/RefeicaoLista';
import RefeicaoForm from '../screens/Refeicao/RefeicaoForm';
import ImcScreen from '../screens/Imc/ImcScreen';
import NutritionScreen from '../screens/Refeicao/NutritionScreen';


// Exercícios (API externa)



const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function UsuariosStack() {
  return (
    <Stack.Navigator initialRouteName="ListaUsuarios">
      <Stack.Screen name="ListaUsuarios" component={HomeScreen} options={{ title: 'Usuários' }} />
      <Stack.Screen name="FormUsuario" component={FormUsuario} options={{ title: 'Novo Usuário' }} />
      <Stack.Screen name="DetalhesUsuario" component={UsuarioScreen} options={{ title: 'Detalhes do Usuário' }} />
    </Stack.Navigator>
  );
}

function TreinosStack() {
  return (
    <Stack.Navigator initialRouteName="ListaTreinos">
      <Stack.Screen name="ListaTreinos" component={TreinoLista} options={{ title: 'Treinos' }} />
      <Stack.Screen name="FormTreino" component={FormTreino} options={{ title: 'Novo Treino' }} />
    </Stack.Navigator>
  );
}

function RefeicoesStack() {
  return (
    <Stack.Navigator initialRouteName="ListaRefeicoes">
      <Stack.Screen name="ListaRefeicoes" component={RefeicaoLista} options={{ title: 'Refeições' }} />
      <Stack.Screen name="FormRefeicao" component={RefeicaoForm} options={{ title: 'Nova Refeição' }} />
    </Stack.Navigator>
  );
}

export default function StackRoutes() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Usuários">
        <Drawer.Screen name="Usuários" component={UsuariosStack} />
        <Drawer.Screen name="Treinos" component={TreinosStack} />
        <Drawer.Screen name="Refeições" component={RefeicoesStack} />
        <Drawer.Screen name="IMC" component={ImcScreen} />
        <Stack.Screen name="Alimentos Fitness" component={NutritionScreen} />
        
        
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
