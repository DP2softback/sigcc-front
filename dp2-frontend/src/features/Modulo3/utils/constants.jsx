import NoDataIcon from '../assets/icons/NoDataFound.svg';

export const CONTINUOS_EVALUATION_TYPE = 'Evaluación Continua';

export const PERFORMANCE_EVALUATION_TYPE = 'Evaluación de Desempeño';

export const DAYS_UNIT = 'días';

export const noDataFound = (
  <div className="col text-center h-100 pt-4">
    <img
      src={NoDataIcon}
      alt="No se han encontrado resultados"
      className="noDataFoundIcon"
    />
  </div>
);

export const loadingScreen = (
  <div className="vertical-align-parent"
    style={{ height: "calc(100vh - 4rem)" }}>
    <div className="vertical-align-child">
      <div className="spinner-border"
        role="status"
        style={{ display: "block", marginLeft: "auto", marginRight: "auto" }}>
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
);
