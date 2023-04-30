import { useState, useEffect } from 'react';
import { FilterData } from '@utils/example';

const useFilter = <T>(data: T[], filterOptions: Partial<T> | undefined) => {

  const [result, setResult] = useState(data === undefined ? [] : data);

  useEffect(() => {
    if (filterOptions) setResult(FilterData<T>(data, filterOptions))
  }, [filterOptions])

  useEffect(() => {
    setResult(data)
  }, [data])

  return result;
};

export default useFilter;