import { ajax } from '../tools/ajax';
import { PERFORMANCE_EVALUATION_TYPE,CONTINUOS_EVALUATION_TYPE, BACKEND_URL, TOKEN } from '../utils/constants';

export const getCategories = async() =>{
    const optionsRequest = {
        method: 'POST',
        url: BACKEND_URL + 'VistaCategoriasSubCategorias',
        headers:{
            Authorization: `Token ${TOKEN}`
          },
        data: 
          {
            evaluationType: PERFORMANCE_EVALUATION_TYPE
        }
          
        }
        return await ajax(optionsRequest);
}

export const getPlantillas = async() =>{
  const optionsRequest = {
      method: 'POST',
      url: BACKEND_URL + 'PlantillasPorGrupo',
      headers:{
          Authorization: `Token ${TOKEN}`
        },
      data: 
        {
          
      }
        
      }
      return await ajax(optionsRequest);
}

export const getPlantilla = async(idPlantilla,type) =>{
    const optionsRequest = {
        method: 'POST',
        url: BACKEND_URL + 'Plantilla',
        headers:{
            Authorization: `Token ${TOKEN}`
          },
          data: {
            id:idPlantilla,
            evaluationType:type
          }
        }
        return await ajax(optionsRequest);
}

export const getCategoriesSubs = async(type) =>{
  const optionsRequest = {
      method: 'POST',
      url: BACKEND_URL + 'VistaCategoriasSubCategorias',
      headers:{
        Authorization: `Token ${TOKEN}`
      },
      data: {      
        evaluationType: type,
      }
  }
  return await ajax(optionsRequest);
}

export const getPlantillasEditar = async(idPlantilla,type) =>{
  const optionsRequest = {
      method: 'POST',
      url: BACKEND_URL + 'PlantillaEditarVista',
      headers:{
          Authorization: `Token ${TOKEN}`
        },
      data: 
        {
          id:idPlantilla,
          evaluationType:type
      }
        
      }
      return await ajax(optionsRequest);
}

export const guardarEditar = async(plantilla,categorias) =>{
  const optionsRequest = {
      method: 'POST',
      url: BACKEND_URL + 'PlantillaEditar',
      headers:{
          Authorization: `Token ${TOKEN}`
        },
      data: 
        {
          "plantilla-id": plantilla["plantilla-id"],
          "plantilla-nombre": plantilla["plantilla-nombre"], 
          "Categories":categorias       
      }
        
      }
      return await ajax(optionsRequest);
}

export const guardarPlantilla = async(plantilla) =>{
  const optionsRequest = {
      method: 'POST',
      url: BACKEND_URL + 'PlantillaCrear',
      headers:{
          Authorization: `Token ${TOKEN}`
        },
      data:{
        "evaluationType": plantilla["evaluationType"], 
        "nombre": plantilla["nombre"],
        "subCategories":plantilla["subCategories"]     
      }
      // data: {...plantilla}  
    }
    return await ajax(optionsRequest);
}