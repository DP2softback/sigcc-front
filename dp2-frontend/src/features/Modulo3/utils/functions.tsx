import { MONTHS_NAMES } from "./constants";

export const navigateTo = (url: string, params?: any) => {
  if (params && Object.keys(params).length > 0) {
    const queryString = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');

    const targetURL = `${url}?${queryString}`;
    window.location.href = targetURL;
  } else {
    window.location.href = url;
  }
};

export const obtenerFechaActual = (): string => {
  const fecha: Date = new Date();
  const anio: number = fecha.getFullYear();
  let mes: string | number = fecha.getMonth() + 1;
  let dia: string | number = fecha.getDate();

  if (mes < 10) {
    mes = '0' + mes;
  }
  if (dia < 10) {
    dia = '0' + dia;
  }

  const fechaActual: string = `${anio}-${mes}-${dia}`;
  return fechaActual;
}

export const obtenerFechaHaceUnAnio = (): string => {
  const fecha: Date = new Date();
  const anio: number = fecha.getFullYear() - 1;
  let mes: string | number = fecha.getMonth() + 1;
  let dia: string | number = fecha.getDate();

  if (mes < 10) {
    mes = '0' + mes;
  }
  if (dia < 10) {
    dia = '0' + dia;
  }

  const fechaHaceUnAnio: string = `${anio}-${mes}-${dia}`;
  return fechaHaceUnAnio;
}

export const navigateBack = (): void => {
  history.back();
}

export const formatNumberWithTwoDecimals = (num: number): string => {
  return num.toFixed(2);
}

export const formatDate = (dateString: string) => {
  const dateParts = dateString.split('T')[0].split('-');
  const year = dateParts[0];
  const month = dateParts[1];
  const day = dateParts[2];

  return `${day}/${month}/${year}`;
};

export function formatEmployeeCode(number: number): string {
  const paddedNumber = number.toString().padStart(8, '0');
  return paddedNumber;
}

export const sortEvaluationsByDate = (evaluations: any[]): any[] => {
  const sortedEvaluations = [...evaluations];

  sortedEvaluations.sort((a, b) => {
    const dateA = new Date(a.evaluationDate);
    const dateB = new Date(b.evaluationDate);
    return dateB.getTime() - dateA.getTime();
  });

  return sortedEvaluations;
};

export const sortEvaluationsByTimeSinceLastEvaluation = (evaluations: any[]): any[] => {
  const sortedEvaluations = [...evaluations];

  sortedEvaluations.sort((a, b) => {
    if (a.time_since_last_evaluation === null) {
      return -1;
    } else if (b.time_since_last_evaluation === null) {
      return 1;
    } else {
      return b.time_since_last_evaluation - a.time_since_last_evaluation;
    }
  });

  return sortedEvaluations;
};

export function formatDashboardJson(jsonData: any[]): any {
  if (!jsonData || jsonData.length < 0) return { months: [], data: [] };

  const months: string[] = [];
  const data: any[] = [];

  function sortMonths(months: string[]) {
    months.sort((a, b) => {
      const [yearA, monthA] = a.split(' ');
      const [yearB, monthB] = b.split(' ');
  
      if (yearA !== yearB) {
        return parseInt(yearA) - parseInt(yearB);
      } else {
        return MONTHS_NAMES.indexOf(monthA) - MONTHS_NAMES.indexOf(monthB);
      }
    });
  }
  
  function getMonthName(monthNumber: string): string {
    const index = parseInt(monthNumber) - 1;
    return MONTHS_NAMES[index];
  }

  jsonData.forEach((item) => {
    const year = item.year;
    item.month.forEach((monthItem) => {
      const month = getMonthName(monthItem.month);
      const categoryScores = monthItem.category_scores;

      categoryScores.forEach((scoreItem, index) => {
        const categoryName = scoreItem.CategoryName;
        const scoreAverage = scoreItem.ScoreAverage;

        const existingData = data.find((d) => d.description === categoryName);

        if (existingData) {
          existingData.values.push(scoreAverage);
        } else {
          const values = Array(months.length).fill(null);
          values.push(scoreAverage);

          data.push({
            description: categoryName,
            values: values,
          });
        }
      });
      months.push(`${year} ${month}`);
    });
  });

  sortMonths(months);

  return {
    months: months,
    data: data,
  };
}

function getMonthName(monthNumber: string): string {
  const months: string[] = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  const index = parseInt(monthNumber) - 1;
  return months[index];
}

export function formatDashboardJsonAreasCategorias(jsonData: any[]): any {
  if (!jsonData || jsonData.length < 0) return { months: [], data: [] };

  const months: string[] = [];
  const data: any[] = [];

  jsonData.forEach((item) => {
    const year = item.year;
    item.month.forEach((monthItem) => {
      const month = getMonthName(monthItem.month);
      const areaScores = monthItem.area_scores;

      areaScores.forEach((scoreItem, index) => {
        const area = scoreItem.AreaName;
        const scoreAverage = scoreItem.ScoreAverage;

        const existingData = data.find((d) => d.description === area);

        if (existingData) {
          existingData.values.push(scoreAverage);
        } else {
          const values = Array(months.length).fill(null);
          values.push(scoreAverage);

          data.push({
            description: area,
            values: values,
          });
        }
      });

      months.push(`${year} ${month}`);
    });
  });

  return {
    months: months,
    data: data,
  };
}

type TransformedDataTypeArea = {
  area: string,
  data: {
    description: string;
    values: number[];
  }[];
  months: string[];
};  

export function formatDashboardJsonAreas(data: any[]): TransformedDataTypeArea[] {
  const transformedData: TransformedDataTypeArea[] = [];

  sortDataByAreaYear(data).forEach(item => {
    let existingData = transformedData.find(d => d.area === item.Area);

    if (!existingData) {
      existingData = {
        area: item.Area,
        data: [],
        months: [],
      };
      transformedData.push(existingData);
    }

    item.Month.forEach(monthItem => {
      const month = getMonthName(monthItem.month);
      existingData.months.push(`${item.Year} ${month}`);

      monthItem.subCategory_scores.forEach(score => {
        let existingSubCategoryData = existingData.data.find(d => d.description === score.SubCategory);

        if (!existingSubCategoryData) {
          existingSubCategoryData = {
            description: score.SubCategory,
            values: [],
          };
          existingData.data.push(existingSubCategoryData);
        }

        existingSubCategoryData.values.push(score.ScoreAverage);
      });
    });
  });
  return sortDataAreaByMonth(transformedData);
}

function sortDataByAreaYear(data: any[]): any[] {
  return data.sort((a, b) => {
    if (a.Area < b.Area) return -1;
    if (a.Area > b.Area) return 1;
    if (parseInt(a.Year) < parseInt(b.Year)) return -1;
    if (parseInt(a.Year) > parseInt(b.Year)) return 1;
    return 0;
  });
}

type TransformedDataTypeCategoria = {
  categoria: string,
  data: {
    description: string;
    values: number[];
  }[];
  months: string[];
};  

export function formatDashboardJsonCategorias(data: any[]): TransformedDataTypeCategoria[] {
  const transformedData: TransformedDataTypeCategoria[] = [];

  sortDataByCategoriaYear(data).forEach(item => {
    let existingData = transformedData.find(d => d.categoria === item.Category);

    if (!existingData) {
      existingData = {
        categoria: item.Category,
        data: [],
        months: [],
      };
      transformedData.push(existingData);
    }

    item.Month.forEach(monthItem => {
      const month = getMonthName(monthItem.month);
      existingData.months.push(`${item.Year} ${month}`);

      monthItem.subCategory_scores.forEach(score => {
        let existingSubCategoryData = existingData.data.find(d => d.description === score.SubCategory);

        if (!existingSubCategoryData) {
          existingSubCategoryData = {
            description: score.SubCategory,
            values: [],
          };
          existingData.data.push(existingSubCategoryData);
        }

        existingSubCategoryData.values.push(score.ScoreAverage);
      });
    });
  });
  return sortDataCategoriaByMonth(transformedData);
}

function sortDataByCategoriaYear(data: any[]): any[] {
  return data.sort((a, b) => {
    if (a.Area < b.Area) return -1;
    if (a.Area > b.Area) return 1;
    if (parseInt(a.Year) < parseInt(b.Year)) return -1;
    if (parseInt(a.Year) > parseInt(b.Year)) return 1;
    return 0;
  });
}

function sortDataAreaByMonth(data: TransformedDataTypeArea[]): TransformedDataTypeArea[] {
  // Creo una función de ayuda para convertir un mes de formato "2023 Enero" a un objeto Date.
  const convertMonthToDate = (month: string) => {
    const [year, monthName] = month.split(' ');
    const monthMap = {
      "Enero": 0,
      "Febrero": 1,
      "Marzo": 2,
      "Abril": 3,
      "Mayo": 4,
      "Junio": 5,
      "Julio": 6,
      "Agosto": 7,
      "Septiembre": 8,
      "Octubre": 9,
      "Noviembre": 10,
      "Diciembre": 11,
    };
    const monthNumber = monthMap[monthName]; 
    return new Date(parseInt(year), monthNumber);
  };
  
  return data.map(areaData => {
    // Creamos un array de indices ordenados por months
    const sortedIndices = areaData.months
      .map((month, index) => ({ index, month: convertMonthToDate(month) }))
      .sort((a, b) => a.month.getTime() - b.month.getTime())
      .map(({ index }) => index);

    // Usamos los indices ordenados para ordenar months y values
    return {
      ...areaData,
      months: sortedIndices.map(index => areaData.months[index]),
      data: areaData.data.map(dataItem => ({
        ...dataItem,
        values: sortedIndices.map(index => dataItem.values[index]),
      })),
    };
  });
}

function sortDataCategoriaByMonth(data: TransformedDataTypeCategoria[]): TransformedDataTypeCategoria[] {
    // Creo una función de ayuda para convertir un mes de formato "2023 Enero" a un objeto Date.
    const convertMonthToDate = (month: string) => {
      const [year, monthName] = month.split(' ');
      const monthMap = {
        "Enero": 0,
        "Febrero": 1,
        "Marzo": 2,
        "Abril": 3,
        "Mayo": 4,
        "Junio": 5,
        "Julio": 6,
        "Agosto": 7,
        "Septiembre": 8,
        "Octubre": 9,
        "Noviembre": 10,
        "Diciembre": 11,
      };
      const monthNumber = monthMap[monthName]; 
      return new Date(parseInt(year), monthNumber);
    };
    
    return data.map(categoriaData => {
      // Creamos un array de indices ordenados por months
      const sortedIndices = categoriaData.months
        .map((month, index) => ({ index, month: convertMonthToDate(month) }))
        .sort((a, b) => a.month.getTime() - b.month.getTime())
        .map(({ index }) => index);
  
      // Usamos los indices ordenados para ordenar months y values
      return {
        ...categoriaData,
        months: sortedIndices.map(index => categoriaData.months[index]),
        data: categoriaData.data.map(dataItem => ({
          ...dataItem,
          values: sortedIndices.map(index => dataItem.values[index]),
        })),
      };
    });
}

export function checkIfAllNull(obj : any) : boolean {
  if (obj === null) return true;

  if (Object.keys(obj).length === 0)
    return true;

  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (obj[key] !== null) {
        return false;
      }
    }
  }
  return true;
}