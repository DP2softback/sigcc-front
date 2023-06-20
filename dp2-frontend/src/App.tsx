import { useRoutes } from "react-router-dom";
import store from "@redux/store";
import { Provider } from "react-redux";
import router from "@routes/router";
import DetalleCompetenciasArea from "@features/Modulo2/Components/JobStatisticsAreaManager/DetalleCompetenciasArea";
import ConsolidadoCompetenciasAM from "@features/Modulo2/Components/JobStatisticsAreaManager/ConsolidadoCompetencias";
import GestionCompetencia from "@features/Modulo2/Components/JobStatisticsAreaManager/GestionCompetencias";
const App: React.FC = () => {
	const content = useRoutes(router);

	{

		return <Provider store={store}>{content}</Provider>;
	}

};

export default App;
