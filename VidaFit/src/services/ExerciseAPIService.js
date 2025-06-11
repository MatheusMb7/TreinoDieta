// src/services/ExerciseAPIService.js

const API_BASE_URL = 'https://api.api-ninjas.com/v1/exercises';
const API_KEY = 'K/9b2O4UBMMIXiBLCWN7/w==6FrDLDfWGw0jHZV3';

export default {
  buscarPorMusculo: async (muscle) => {
    try {
      const response = await fetch(`${API_BASE_URL}?muscle=${muscle}`, {
        headers: {
          'X-Api-Key': API_KEY
        }
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar exercícios');
      }

      const data = await response.json();

      // Traduz os campos para português
      const dadosTraduzidos = data.slice(0, 10).map(item => traduzirCampos(item));

      return dadosTraduzidos;
    } catch (error) {
      console.error('Erro na API de exercícios:', error);
      return getMockExercises(muscle);
    }
  },

  buscarPorTipo: async (type) => {
    try {
      const response = await fetch(`${API_BASE_URL}?type=${type}`, {
        headers: {
          'X-Api-Key': API_KEY
        }
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar exercícios');
      }

      const data = await response.json();

      const dadosTraduzidos = data.slice(0, 10).map(item => traduzirCampos(item));

      return dadosTraduzidos;
    } catch (error) {
      console.error('Erro na API de exercícios:', error);
      return getMockExercises(type);
    }
  }
};

function traduzirCampos(item) {
  return {
    nome: item.name,
    tipo: traduzirTipo(item.type),
    musculo: traduzirMusculo(item.muscle),
    equipamento: traduzirEquipamento(item.equipment),
    dificuldade: traduzirDificuldade(item.difficulty),
    instrucoes: item.instructions
  };
}

// Funções auxiliares para traduzir valores específicos

function traduzirTipo(type) {
  const map = {
    strength: 'força',
    cardio: 'cardio',
    plyometrics: 'pliometria',
    stretching: 'alongamento',
    powerlifting: 'levantamento de peso',
    strongman: 'força máxima',
    // outros tipos que você queira mapear...
  };
  return map[type.toLowerCase()] || type;
}

function traduzirMusculo(muscle) {
  const map = {
    chest: 'peito',
    back: 'costas',
    shoulders: 'ombros',
    biceps: 'bíceps',
    triceps: 'tríceps',
    quadriceps: 'quadríceps',
    hamstrings: 'isquiotibiais',
    abdominals: 'abdominais',
    'corpo inteiro': 'corpo inteiro',
    // etc...
  };
  return map[muscle.toLowerCase()] || muscle;
}

function traduzirEquipamento(equipment) {
  const map = {
    'body only': 'apenas o corpo',
    barbell: 'barra',
    dumbbell: 'halteres',
    machine: 'máquina',
    cable: 'cabo',
    kettlebell: 'kettlebell',
    // outros equipamentos...
  };
  return map[equipment.toLowerCase()] || equipment;
}

function traduzirDificuldade(difficulty) {
  const map = {
    beginner: 'iniciante',
    intermediate: 'intermediário',
    expert: 'avançado',
  };
  return map[difficulty.toLowerCase()] || difficulty;
}

function getMockExercises(filter) {
  const mockData = [
    {
      nome: "Flexões",
      tipo: "força",
      musculo: "peito",
      equipamento: "apenas o corpo",
      dificuldade: "iniciante",
      instrucoes: "Comece em posição de prancha. Abaixe o corpo até que o peito quase toque o chão. Empurre de volta para a posição inicial."
    },
    {
      nome: "Agachamentos",
      tipo: "força",
      musculo: "quadríceps",
      equipamento: "apenas o corpo",
      dificuldade: "iniciante",
      instrucoes: "Fique em pé com os pés afastados na largura dos ombros. Abaixe o corpo como se fosse sentar em uma cadeira. Retorne à posição em pé."
    },
    {
      nome: "Avanços",
      tipo: "força",
      musculo: "quadríceps",
      equipamento: "apenas o corpo",
      dificuldade: "iniciante",
      instrucoes: "Dê um passo à frente com uma perna, abaixando os quadris até que ambos os joelhos fiquem dobrados em 90 graus. Volte à posição inicial."
    },
    {
      nome: "Prancha",
      tipo: "força",
      musculo: "abdominais",
      equipamento: "apenas o corpo",
      dificuldade: "iniciante",
      instrucoes: "Mantenha a posição de flexão com o corpo em linha reta da cabeça aos calcanhares."
    },
    {
      nome: "Burpees",
      tipo: "cardio",
      musculo: "corpo inteiro",
      equipamento: "apenas o corpo",
      dificuldade: "intermediário",
      instrucoes: "Comece em pé, agache, pule para a posição de prancha, faça uma flexão, traga os pés de volta ao agachamento e salte com os braços acima da cabeça."
    }
  ];

  return mockData;
}
