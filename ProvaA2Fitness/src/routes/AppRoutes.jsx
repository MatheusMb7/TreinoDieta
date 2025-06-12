import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import StackRoutes from './StackRoutes'

const Drawer = createDrawerNavigator()

export default function AppRoutes() {
  return (
    <Drawer.Navigator initialRouteName="Home">

      <Drawer.Screen
        name="Home"
        component={StackRoutes}
        initialParams={{ screen: 'Home' }}
        options={{ title: 'Início' }}
      />

      <Drawer.Screen
        name="Treinos"
        component={StackRoutes}
        initialParams={{ screen: 'TreinoLista' }}
        options={{ title: 'Treinos' }}
      />

      <Drawer.Screen
        name="Progresso"
        component={StackRoutes}
        initialParams={{ screen: 'ProgressoLista' }}
        options={{ title: 'Progresso' }}
      />

    </Drawer.Navigator>
  )
}
