import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeScreen from '../screens/home/HomeScreen'
import TreinoLista from '../screens/treino/TreinoLista'
import TreinoForm from '../screens/treino/TreinoForm'
import ProgressoLista from '../screens/progresso/ProgressoLista'
import ProgressoForm from '../screens/progresso/ProgressoForm'
import ImcForm from '../screens/ImcScreen'

const Stack = createNativeStackNavigator()

export default function StackRoutes() {
  return (
    <Stack.Navigator initialRouteName="Home">
      
      {/* Home */}
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'Início' }} 
      />

      {/* Treino */}
      <Stack.Screen 
        name="TreinoLista" 
        component={TreinoLista} 
        options={{ title: 'Treinos' }} 
      />
      <Stack.Screen 
        name="TreinoForm" 
        component={TreinoForm} 
        options={{ title: 'Cadastrar / Editar Treino' }} 
      />

      {/* Progresso */}
      <Stack.Screen 
        name="ProgressoLista" 
        component={ProgressoLista} 
        options={{ title: 'Progresso' }} 
      />
      <Stack.Screen 
        name="ProgressoForm" 
        component={ProgressoForm} 
        options={{ title: 'Cadastrar / Editar Progresso' }} 
      />

      {/* IMC */}
      <Stack.Screen 
        name="IMCScreen" 
        component={ImcForm} 
        options={{ title: 'Calculadora de IMC' }}
      />

    </Stack.Navigator>
  )
}
