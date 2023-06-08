import { ajax } from "../tools/ajax";
import {
  CONTINUOS_EVALUATION_TYPE,
  REPORT_CONTINUOS_EVALUATION,
  REPORT_PERFORMANCE_EVALUATION,
  BACKEND_URL,
  TOKEN,
} from "../utils/constants";
import axios from "axios";

export const getAreas = () => {
  return axios
    .get(`${BACKEND_URL}areas`, {
      headers: { Authorization: `Token ${TOKEN}` },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Hubo un error obteniendo las áreas", error);
    });
};

export const getCategoriasContinua = () => {
  return axios
    .get(`${BACKEND_URL}categorias/continuas`, {
      headers: { Authorization: `Token ${TOKEN}` },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Hubo un error obteniendo las categorías", error);
    });
};
export const getCategoriasDesempenio = () => {
  return axios
    .get(`${BACKEND_URL}categorias/desempenio`, {
      headers: { Authorization: `Token ${TOKEN}` },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Hubo un error obteniendo las categorías", error);
    });
};

export const getReportContinuaLineChart = ( areaid, categoriaid, dateFechaInicio, dateFechaFin, tipoEvaluacion) => {
  return axios
    .get(`${BACKEND_URL}reporte`, {
      params: {
        areaId: areaid,
        categoriaId: categoriaid,
        fechaInicio: dateFechaInicio,
        fechaFin: dateFechaFin,
        tipoEvaluacion: tipoEvaluacion,
      },
    })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log("Hubo un error con la solicitud:", error);
    });
};
export const getReportDesempenioLineChart = ( areaid, categoriaid, dateFechaInicio, dateFechaFin, tipoEvaluacion) => {
  return axios
    .get(`${BACKEND_URL}reporte`, {
      params: {
        areaId: areaid,
        categoriaId: categoriaid,
        fechaInicio: dateFechaInicio,
        fechaFin: dateFechaFin,
        tipoEvaluacion: tipoEvaluacion,
      },
    })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log("Hubo un error con la solicitud:", error);
    });
};

// Para probar

export const getEmployeesEvaluationDashboard = async (bossId) => {  
  try {
    const response = await axios.post(BACKEND_URL + 'LineChartEvaluaciones', 
    {
      id: bossId,
      evaluationType: CONTINUOS_EVALUATION_TYPE,
    }, {
      headers: {
        Authorization: `Token ${TOKEN}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Funciones provicionales

export const getPostAreas = async () => {
  const bodyParameters = {
    param1: "valor1",
    param2: "valor2",
  };
  try {
    const response = await axios.post(`${BACKEND_URL}areas`, 
    bodyParameters, 
      {
        headers: { Authorization: `Token ${TOKEN}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Hubo un error obteniendo las áreas", error);
  }
};

export const getPostCategoriasContinua = async () => {
  const bodyParameters = {
    param1: "valor1",
    param2: "valor2",
  };
  try {
    const response = await axios.post(`${BACKEND_URL}categoriasContinua`, 
      bodyParameters, 
      {
      headers: { Authorization: `Token ${TOKEN}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Hubo un error obteniendo las categorías", error);
  }
};

export const getPostCategoriasDesempenio = async () => {
  const bodyParameters = {
    param1: "valor1",
    param2: "valor2",
  };
  try {
    const response = await axios.post(`${BACKEND_URL}categoriasDesempenio`, 
      bodyParameters, 
      {
      headers: { Authorization: `Token ${TOKEN}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Hubo un error obteniendo las categorías", error);
  }
};

export const getPostReportContinuaLineChart = async (areaid, categoriaid, dateFechaInicio, dateFechaFin) => {
  try {
    const response = await axios.post(`${BACKEND_URL}reporte`, {
      areaId: areaid,
      categoriaId: categoriaid,
      fechaInicio: dateFechaInicio,
      fechaFin: dateFechaFin,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("Hubo un error con la solicitud:", error);
  }
};

export const getPostReportDesempenioLineChart = async (areaid, categoriaid, dateFechaInicio, dateFechaFin) => {
  try {
    const response = await axios.post(`${BACKEND_URL}reporte`, {
      areaId: areaid,
      categoriaId: categoriaid,
      fechaInicio: dateFechaInicio,
      fechaFin: dateFechaFin,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("Hubo un error con la solicitud:", error);
  }
};

// EL POST DEL REPORTE PARA EVALUACION CONTINUA Y DESEMPEÑO
export const postReportLineChart = async (areaid, categoriaid, dateFechaInicio, dateFechaFin, evaluationType) => {
  const body ={
    "evaluationType": evaluationType,
    "fecha_inicio": dateFechaInicio,
    "fecha_fin": dateFechaFin
  }
  if(areaid!==0){
    body["area-id"]=areaid
  }
  if(categoriaid!==0){
    body["category-id"]=categoriaid
  }
  console.log("body: ", body);
  try {
    const response = await axios.post(`${BACKEND_URL}LineChartEvaluacionesReporte`,
      body,
      {
        headers:{
          "Authorization": `Token ${TOKEN}`,
          "Content-Type": 'application/json'
        }
      }
    );
    console.log("Respuesta del Post: ",response.data);
    return response.data;
  } catch (error) {
    console.log("Hubo un error con la solicitud:", error);
  }
};
