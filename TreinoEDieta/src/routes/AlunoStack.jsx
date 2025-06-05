import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import AlunoLista from '../screens/aluno/AlunoLista'
import AlunoForm from '../screens/aluno/ALunoForm'


const Stack = createStackNavigator()

export default function AlunoStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AlunoLista"
        component={AlunoLista}
        options={{ title: 'Lista de Alunos', headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="AlunoForm"
        component={AlunoForm}
        options={{ title: 'Cadastro de Aluno', headerTitleAlign: 'center' }}
      />
    </Stack.Navigator>
  )
}
