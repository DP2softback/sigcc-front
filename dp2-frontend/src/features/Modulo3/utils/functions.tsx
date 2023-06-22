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

export const navigateBack = () => {
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

export function formatNumber(number: number): string {
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
      const categoryScores = monthItem.category_scores;

      categoryScores.forEach((scoreItem, index) => {
        const area = scoreItem.Area;
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

export function formatPrueba(jsonData: any[]): any {
  if (!jsonData || jsonData.length < 0) return { months: [], data: [] };

  const months: string[] = [];
  const data: any[] = [];

  jsonData = sortDatabyAreaMonth(jsonData);

  jsonData.forEach((item) => {
    const area = item.Area;
    const year = item.Year;
    item.Month.forEach((monthItem) => {
      const month = getMonthName(monthItem.month);
      const subCategory_scores = monthItem.subCategory_scores;

      subCategory_scores.forEach((scoreItem, index) => {
        const subCategory = scoreItem.SubCategory;
        const scoreAverage = scoreItem.ScoreAverage;

        const existingData = data.find((d) => d.description === subCategory);

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

const sortDatabyAreaMonth = (jsonData: any[]): any[] => {
  jsonData.sort((a, b) => {
    if (a.Area < b.Area) {
      return -1;
    } 
    if (a.Area > b.Area) {
      return 1;
    }
    // En este punto, las Areas son iguales, así que comparamos los años.
    if (a.Year < b.Year) {
      return -1;
    } 
    if (a.Year > b.Year) {
      return 1;
    }
    // Las Areas y los años son iguales.
    return 0;
  });
  return jsonData;
}

type OriginalDataCategoryType = {
  Area: string;
  Year: string;
  Month: {
    month: string;
    subCategory_scores: {
      SubCategory: string;
      ScoreAverage: number;
    }[];
  }[];
};

export function formatDashboardJsonCategory(data: OriginalDataCategoryType[]): any {
  return data.map((areaData) => {
    const values = areaData.Month.flatMap((monthData) =>
      monthData.subCategory_scores.map((scoreData) => scoreData.ScoreAverage)
    );
    return {
      data: [{ description: areaData.Area, values }],
      months: areaData.Month.map((monthData) => `${areaData.Year} ${monthData.month}`),
    };
  });
}

type TransformedDataType = {
  area: string,
  data: {
    description: string;
    values: number[];
  }[];
  months: string[];
};  

export function transformData(data: any[]): TransformedDataType[] {
  const transformedData: TransformedDataType[] = [];
  
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

  return transformedData;
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
