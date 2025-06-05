import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

export default function Progresso() {
  // Dados estáticos simulados para demonstração
  const [data, setData] = useState({
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      {
        data: [65, 70, 72, 75, 80, 85],
        strokeWidth: 2,
      },
    ],
  });

  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Progresso Físico</Text>
      <LineChart
        data={data}
        width={screenWidth - 20}
        height={220}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#e0f7fa',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(26, 188, 156, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0,0,0,${opacity})`,
          style: { borderRadius: 16 },
          propsForDots: { r: '6', strokeWidth: '2', stroke: '#1abc9c' },
        }}
        style={styles.chart}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  chart: { borderRadius: 16 }
});
