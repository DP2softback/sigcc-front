import axiosInt from "@config/axios";
import { PRINT_SOMETHING, SOMETHING } from "@config/endpoints";

const GetAllExamples = () => {
  return axiosInt ({
    url: SOMETHING, 
    method: 'GET',
  })
}

const GenerateSomePDF = (data: object) => {
  return axiosInt ({
    url: PRINT_SOMETHING, 
    method: 'POST',
    data: data,
    responseType: 'blob'
  })
}

export {
  GetAllExamples,
  GenerateSomePDF
}