import NoDataIcon from '../assets/icons/NoDataFound.svg';

export const CONTINUOS_EVALUATION_TYPE = 'Evaluación Continua';

export const PERFORMANCE_EVALUATION_TYPE = 'Evaluación de Desempeño';

export const noDataFound = (
  <div className="col text-center h-100 pt-4">
    <img
      src={NoDataIcon}
      alt="No se han encontrado resultados"
      className="noDataFoundIcon"
    />
  </div>
);