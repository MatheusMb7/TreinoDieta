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
