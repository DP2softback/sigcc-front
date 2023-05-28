export const navigateTo = (url: string, params?: any) => {
  if (params && Object.keys(params).length > 0) {
    const queryString = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');

    const targetURL = `${url}?${queryString}`;
    window.location.assign(targetURL);
  } else {
    window.location.assign(url);
  }
};

export const formatDate = (dateString: string) => {
  const dateParts = dateString.split('T')[0].split('-');
  const year = dateParts[0];
  const month = dateParts[1];
  const day = dateParts[2];

  return `${day}/${month}/${year}`;
};

export function formatNumber(number: number): string {
  const paddedNumber = number.toString().padStart(8, '0');
  return paddedNumber;
}

interface ScoreData {
  year: number;
  month: number;
  categoria_nombre: string;
  final_score: number;
}

interface ResultData {
  months: string[];
  valuesPerCategory: {
    description: string;
    values: (number | null)[];
  }[];
}

export function processData(data: ScoreData[]): ResultData {
  // Obtener todos los meses únicos y ordenarlos cronológicamente
  const uniqueMonths = Array.from(
    new Set(data.map((item) => `${item.year} ${getMonthName(item.month)}`))
  ).sort();

  // Crear una estructura de datos para almacenar los valores por categoría
  const valuesPerCategory: { [key: string]: (number | null)[] } = {};

  // Iterar sobre los datos y agregar los valores a la estructura de datos
  for (const item of data) {
    const monthIndex = uniqueMonths.indexOf(`${item.year} ${getMonthName(item.month)}`);
    const category = item.categoria_nombre;
    const value = item.final_score;

    if (!(category in valuesPerCategory)) {
      valuesPerCategory[category] = Array(uniqueMonths.length).fill(null);
    }

    valuesPerCategory[category][monthIndex] = value;
  }

  // Construir el objeto de resultado final
  const result: ResultData = {
    months: uniqueMonths,
    valuesPerCategory: Object.entries(valuesPerCategory).map(([description, values]) => ({
      description,
      values,
    })),
  };

  return result;
}

function getMonthName(month: number): string {
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  return months[month - 1];
}