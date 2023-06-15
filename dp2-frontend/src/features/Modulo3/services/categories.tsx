import { ajax } from '../tools/ajax';
import {  BACKEND_URL, TOKEN } from '../utils/constants';

export const listAllCategorias = async() =>{
    const optionsRequest = {
        method: 'POST',
        url: BACKEND_URL + 'ListAllCategorias',
        headers:{
            Authorization: `Token ${TOKEN}`
          },
        data: 
          {
            
        }
          
        }
        return await ajax(optionsRequest);
  }