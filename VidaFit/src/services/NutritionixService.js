// src/services/NutritionixService.js
import axios from 'axios';

const APP_ID = '94a416df'; // Substitua pelos seus dados da Nutritionix
const APP_KEY = '53bd97e5b2ad63562ed080abcba2f89a';
const BASE_URL = 'https://trackapi.nutritionix.com/v2';

const headers = {
  'x-app-id': APP_ID,
  'x-app-key': APP_KEY,
  'Content-Type': 'application/json'
};

export async function buscarRefeicoesFitness(termo = 'chicken') {
  try {
    const response = await axios.post(`${BASE_URL}/natural/nutrients`, {
      query: termo
    }, { headers });

    return response.data.foods.map(item => ({
      nome: item.food_name,
      calorias: item.nf_calories,
      proteinas: item.nf_protein,
      gordura: item.nf_total_fat,
      carboidratos: item.nf_total_carbohydrate,
      imagem: item.photo.thumb
    }));
  } catch (error) {
    console.error('Erro na API Nutritionix:', error.response?.data || error.message);
    return [];
  }
}
