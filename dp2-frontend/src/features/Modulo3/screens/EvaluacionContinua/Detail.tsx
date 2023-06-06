import "bootstrap/dist/css/bootstrap.min.css";
import "./EvaluacionContinua.css";
import BaseForm from "./BaseForm";
import { useEffect, useState } from "react";
import { getPlantilla } from "@features/Modulo3/services/templates";
import { CONTINUOS_EVALUATION_TYPE } from "@features/Modulo3/utils/constants";

const Detail = () => {
  const urlParams = new URLSearchParams(window.location.search);

  const [categories, setCategories] = useState([]);
  const [employee, setEmployee] = useState({
    id: parseInt(urlParams.get('id')),
    name: urlParams.get('name')
  })
  const [evaluation, setEvaluation] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const response = await getPlantilla(2, CONTINUOS_EVALUATION_TYPE);
      if (response && response[0] && response[0].Categories) {
        setCategories(response[0].Categories);
      }
      setIsLoading(false);
    })();
  }, []);

  return (
    <BaseForm
      employee={employee}
      categories={categories}
      evaluation={evaluation}
      isLoading={isLoading}
      isReadOnly={true}
    />
  );
};

export default Detail;
