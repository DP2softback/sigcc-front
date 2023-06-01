import axios from "axios";

const url = "https://o4vwfhvzsh.execute-api.us-east-1.amazonaws.com/dev-modulo-brechas/api/v1/";

export async function getCompetencesTypes() {
  try {
    // 👇️ const data: GetUsersResponse
    const { data, status } = await axios.get(
      url + 'gaps/competenceTypes',
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
      return error.message;
    } else {
      console.log('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
}

export async function getEmployeeCompetences(obj) {
  try {
    const { data, status } = await axios.post(
      url + 'gaps/competenceSearch',
      {idCompetencia: obj.idCompetencia, palabraClave: obj.palabraClave, idTipoCompetencia: obj.idTipoCompetencia, activo: 2, idEmpleado: obj.idEmpleado},
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
      return error.message;
    } else {
      console.log('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
}