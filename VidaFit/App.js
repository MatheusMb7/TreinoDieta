import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import StackRoutes from './src/routes/StackRoutes';

export default function App() {
  return (
    <PaperProvider>
      <StackRoutes />
    </PaperProvider>
  );
}
