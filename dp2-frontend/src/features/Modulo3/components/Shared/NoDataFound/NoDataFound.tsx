import NoDataIcon from '@features/Modulo3/assets/icons/NoDataFound.svg';

const NoDataFound = () => {
  return (
    <div className="col text-center pt-4">
      <img
        src={NoDataIcon}
        alt="No se han encontrado resultados"
        className="noDataFoundIcon"
      />
    </div>
  );
};

export default NoDataFound;