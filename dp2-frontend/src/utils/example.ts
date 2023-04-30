/**
 * @param   { number[] }  numbersArray  Array of integer numbers.
 * @return  { number }                  The largest integer of the array.
*/
const FindLargestNumber = (numbersArray: number[]) : number => {
  return numbersArray.reduce((acc, element) => element > acc ? element : acc)
}

/**
 * @param   { number[] }  numbersArray  Array of integer numbers.
 * @return  { number }                  The sum of the elements of the array.
*/
const SumOfElements = (numbersArray: number[]) : number => {
  return numbersArray.reduce((acc, element) => element + acc)
}





export const FilterData = <T>(data: T[], filterOptions: Partial<T> | undefined) => {
  if (typeof filterOptions !== undefined && typeof filterOptions !== null) {
    let result = [];
    data.forEach((item: T) => {
      let conditions = true;
      for (const [key, value] of Object.entries(item)) {
        let condition = true;
        if (filterOptions[key] !== undefined && filterOptions[key] !== null) {
          if (typeof value === 'string') condition = item[key].toLowerCase().includes(filterOptions[key].toLowerCase());
          else condition = item[key]?.toString().includes(filterOptions[key].toString());
          conditions = conditions && condition;
        }
      }
      if (conditions === true) result.push(item)
    })
    return result;
  } else return data;
}