import { ajax } from "../tools/ajax";
import {
  CONTINUOS_EVALUATION_TYPE,
  BACKEND_URL,
  SAMPLE_TOKEN,
} from "../utils/constants";
import axios from "axios";

export const getAreas = () => {
  return axios
    .get(`${BACKEND_URL}areas`, {
      headers: { Authorization: `Token ${SAMPLE_TOKEN}` },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Hubo un error obteniendo las áreas", error);
    });
};

export const getCategoriasContinua = () => {
  return axios
    .get(`${BACKEND_URL}categoriasContinua`, {
      headers: { Authorization: `Token ${SAMPLE_TOKEN}` },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Hubo un error obteniendo las categorías", error);
    });
};
export const getCategoriasDesempenio = () => {
  return axios
    .get(`${BACKEND_URL}categoriasDesempenio`, {
      headers: { Authorization: `Token ${SAMPLE_TOKEN}` },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Hubo un error obteniendo las categorías", error);
    });
};

export const getReportLineChart = ( areaid, categoriaid, dateFechaInicio, dateFechaFin, tipoEvaluacion) => {
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
      // Aquí puedes manejar la respuesta.
      // Por ejemplo, puedes establecer algún estado con los datos devueltos.
      console.log(response.data);
    })
    .catch((error) => {
      // Aquí puedes manejar cualquier error que ocurra durante la solicitud.
      console.log("Hubo un error con la solicitud:", error);
    });
};

export const getEmployeesEvaluationDashboard = async (bossId) => {  
  try {
    const response = await axios.post(BACKEND_URL + 'LineChartEvaluaciones', 
    {
      id: bossId,
      evaluationType: CONTINUOS_EVALUATION_TYPE,
    }, {
      headers: {
        Authorization: `Token ${SAMPLE_TOKEN}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}