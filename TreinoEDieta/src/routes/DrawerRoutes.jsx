// src/routes/DrawerRoutes.js
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'

import HomeScreen from '../screens/usuario/HomeScreen'
import AlunoStack from './AlunoStack'

const Drawer = createDrawerNavigator()

export default function DrawerRoutes() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Usuários' }}
      />
      <Drawer.Screen
        name="Alunos"
        component={AlunoStack}
        options={{ title: 'Alunos' }}
      />
    </Drawer.Navigator>
  )
}
