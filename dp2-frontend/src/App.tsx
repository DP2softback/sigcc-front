import { useRoutes } from "react-router-dom";
import store from "@redux/store";
import { Provider } from "react-redux";
import router from "@routes/router";
import GestionCompetencia from "@features/Modulo2/Components/JobStatisticsAreaManager/GestionCompetencias";
import ConsolidadoCompetencias from "@features/Modulo2/Components/JobStatisticsAreaManager/ConsolidadoCompetencias";
import DetalleCompetenciasArea from "@features/Modulo2/Components/JobStatisticsAreaManager/DetalleCompetenciasArea";



const App: React.FC = () => {
	const content = useRoutes(router);

	{
		/*
		return <Provider store={store}>{content}</Provider>;
		*/

	}

	return <ConsolidadoCompetencias />;

};

export default App;
