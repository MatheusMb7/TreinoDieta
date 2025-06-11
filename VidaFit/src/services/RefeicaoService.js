<<<<<<< HEAD
import axios from 'axios';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1/';

export async function buscarRefeicoesAleatorias(qtd = 5) {
  try {
    const promessas = Array.from({ length: qtd }, () =>
      axios.get(`${BASE_URL}random.php`)
    );

    const respostas = await Promise.all(promessas);
    return respostas.map(res => {
      const meal = res.data.meals[0];
      return {
        id: meal.idMeal,
        nome: meal.strMeal,
        imagem: meal.strMealThumb,
        categoria: meal.strCategory,
        origem: meal.strArea,
        instrucoes: meal.strInstructions
      };
    });
  } catch (error) {
    console.error('Erro ao buscar refeições da API externa:', error);
    return [];
  }
}
=======
import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE = '@refeicoes';

// Dados iniciais para primeira execução
const dadosIniciais = [
  { id: 1, nome: 'Café da manhã', descricao: 'Pão, café, frutas', calorias: 300, tipo: 'Café', horario: '07:00' },
  { id: 2, nome: 'Almoço', descricao: 'Arroz, feijão, frango', calorias: 700, tipo: 'Principal', horario: '12:00' },
];

async function listar() {
  try {
    const dados = await AsyncStorage.getItem(CHAVE);
    if (dados) {
      return JSON.parse(dados);
    } else {
      // Primeira execução - salva dados iniciais
      await AsyncStorage.setItem(CHAVE, JSON.stringify(dadosIniciais));
      return dadosIniciais;
    }
  } catch (error) {
    console.error('Erro ao listar refeições:', error);
    return dadosIniciais;
  }
}

async function inserir(refeicao) {
  try {
    const refeicoes = await listar();
    const maxId = refeicoes.length > 0 ? Math.max(...refeicoes.map(r => r.id)) : 0;
    refeicao.id = maxId + 1;
    refeicoes.push(refeicao);
    await AsyncStorage.setItem(CHAVE, JSON.stringify(refeicoes));
  } catch (error) {
    console.error('Erro ao inserir refeição:', error);
    throw error;
  }
}

async function atualizar(refeicao) {
  try {
    const refeicoes = await listar();
    const index = refeicoes.findIndex(r => r.id === refeicao.id);
    if (index >= 0) {
      refeicoes[index] = refeicao;
      await AsyncStorage.setItem(CHAVE, JSON.stringify(refeicoes));
    }
  } catch (error) {
    console.error('Erro ao atualizar refeição:', error);
    throw error;
  }
}

async function remover(id) {
  try {
    const refeicoes = await listar();
    const novasRefeicoes = refeicoes.filter(r => r.id !== id);
    await AsyncStorage.setItem(CHAVE, JSON.stringify(novasRefeicoes));
  } catch (error) {
    console.error('Erro ao remover refeição:', error);
    throw error;
  }
}

export default {
  listar,
  inserir,
  atualizar,
  remover
};
>>>>>>> 06b31ae (alterações)
