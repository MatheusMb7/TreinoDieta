import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'

import HomeScreen from '../screens/usuario/HomeScreen'
import UsuarioScreen from '../screens/usuario/UsuarioScreen'
import AlunoStack from './AlunoStack'

const Drawer = createDrawerNavigator()

export default function StackRoutes() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Usuários' }}
      />
      <Drawer.Screen
        name="UsuarioScreen"
        component={UsuarioScreen}
        options={{ title: 'Detalhes do Usuário' }}
      />
      <Drawer.Screen
        name="AlunoStack"
        component={AlunoStack}
        options={{ title: 'Cadastro de Alunos' }}
      />
    </Drawer.Navigator>
  )
}
