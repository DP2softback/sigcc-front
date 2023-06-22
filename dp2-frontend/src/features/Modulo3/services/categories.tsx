import { ajax } from '../tools/ajax';
import {  BACKEND_URL, TOKEN } from '../utils/constants';

export const listAllCategorias = async(type) =>{
    const optionsRequest = {
        method: 'POST',
        url: BACKEND_URL + 'ListAllCategorias',
        headers:{
            Authorization: `Token ${TOKEN}`
          },
          data: {      
            evalType: type,
          }
          
        }
        return await ajax(optionsRequest);
  }

  export const listSubcategories = async(idCategorie) =>{
    const optionsRequest = {
        method: 'POST',
        url: BACKEND_URL + 'category/' + idCategorie,
        headers:{
            Authorization: `Token ${TOKEN}`
          },
          data: {      
            
          }
          
        }
        return await ajax(optionsRequest);
  }

  export const eliminarSubcategorie = async(idSub,idCat) =>{
    const optionsRequest = {
        method: 'DELETE',
        url: BACKEND_URL + 'ActualizarCategoria',
        headers:{
            Authorization: `Token ${TOKEN}`
          },
        data:{
          "idSubCategoria":idSub,
          "idCategoria":idCat,
        }
        // data: {...plantilla}  
      }
      return await ajax(optionsRequest);
  }
  export const agregarSubcategorias = async(subcategorias,idCategory) =>{
    const optionsRequest = {
        method: 'POST',
        url: BACKEND_URL +'category/' + idCategory+ '/subcategory',
        headers:{
            Authorization: `Token ${TOKEN}`
          },
          data: {      
            "Subcategorias":subcategorias,
          }
          
        }
        return await ajax(optionsRequest);
  }

  export const listarCompetenciasFree = async() =>{
    const optionsRequest = {
        method: 'GET',
        url: BACKEND_URL +'competences/free',
        headers:{
            Authorization: `Token ${TOKEN}`
          },

          
        }
        return await ajax(optionsRequest);
  }
