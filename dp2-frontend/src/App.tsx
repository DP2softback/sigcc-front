import { useRoutes } from 'react-router-dom';
import { AuthProvider } from '@contexts/JWTAuthContext';
import routes from '@config/router';
import Authenticated from '@components/Authenticated';
import ConsolidadoCompetencias from '@features/Modulo2/Components/VisualizacionBrechasTrabajadorRRHH/ConsolidadoCompetencias';
import DetalleCompetenciasArea from '@features/Modulo2/Components/VisualizacionBrechasTrabajadorRRHH/DetalleCompetenciasArea';
import GestionCompetencia from '@features/Modulo2/Components/VisualizacionBrechasTrabajadorRRHH/GestionCompetencias';

const App = () => {

  const content = useRoutes(routes);

  return (
    <>
      {
          
      <AuthProvider>
        <Authenticated>
          { content }
        </Authenticated>
      </AuthProvider>
      
      }
    </>

  )
}

export default App;