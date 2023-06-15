import { useRoutes } from "react-router-dom";
import store from "@redux/store";
import { Provider } from "react-redux";
import router from "@routes/router";
import DetalleCompetenciasArea from "@features/Modulo2/Components/VisualizacionBrechasTrabajadorRRHH/DetalleCompetenciasArea";

const App: React.FC = () => {
	const content = useRoutes(router);

	{
		return <Provider store={store}>{content}</Provider>;
	}

};

export default App;
