import { ajax } from '../tools/ajax';
import { PERFORMANCE_EVALUATION_TYPE,CONTINUOS_EVALUATION_TYPE, BACKEND_URL, SAMPLE_TOKEN } from '../utils/constants';


export const getCategories = async() =>{
    const optionsRequest = {
        method: 'GET',
        url: BACKEND_URL + 'categories',
        headers:{
            Authorization: `Token ${SAMPLE_TOKEN}`
          },

        }
        return await ajax(optionsRequest);
}

export const getPlantilla = async(idPlantilla) =>{
    const optionsRequest = {
        method: 'GET',
        url: BACKEND_URL + 'plantilla',
        headers:{
            Authorization: `Token ${SAMPLE_TOKEN}`
          },
          params: {
            id:idPlantilla,
          }
        }
        return await ajax(optionsRequest);
}

export const getCategoriesSubs = async() =>{
  const optionsRequest = {
      method: 'POST',
      url: BACKEND_URL + 'VistaCategoriasSubCategorias',
      headers:{
        Authorization: `Token ${SAMPLE_TOKEN}`
      },
      data: {      
        evaluationType: PERFORMANCE_EVALUATION_TYPE,
      }
  }
  return await ajax(optionsRequest);
}