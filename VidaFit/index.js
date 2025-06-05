import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home';
import TreinoLista from '../screens/Treino/TreinoLista';
import TreinoForm from '../screens/Treino/TreinoForm';
import RefeicaoLista from '../screens/Refeicao/RefeicaoLista';
import RefeicaoForm from '../screens/Refeicao/RefeicaoForm';
import Progresso from '../screens/Progresso/Progresso';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function TreinoStack() {
  return (
    <Stack.Navigator initialRouteName="ListaTreinos">
      <Stack.Screen name="ListaTreinos" component={TreinoLista} options={{ title: 'Treinos' }} />
      <Stack.Screen name="FormTreino" component={TreinoForm} options={{ title: 'Cadastro de Treino' }} />
    </Stack.Navigator>
  );
}

function RefeicaoStack() {
  return (
    <Stack.Navigator initialRouteName="ListaRefeicoes">
      <Stack.Screen name="ListaRefeicoes" component={RefeicaoLista} options={{ title: 'Refeições' }} />
      <Stack.Screen name="FormRefeicao" component={RefeicaoForm} options={{ title: 'Cadastro de Refeição' }} />
    </Stack.Navigator>
  );
}

export default function Routes() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Treinos" component={TreinoStack} />
        <Drawer.Screen name="Refeições" component={RefeicaoStack} />
        <Drawer.Screen name="Progresso" component={Progresso} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
