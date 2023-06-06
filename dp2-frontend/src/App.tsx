import { useRoutes } from 'react-router-dom';
import { AuthProvider } from '@contexts/JWTAuthContext';
import routes from '@config/router';
import Authenticated from '@components/Authenticated';
import ConsolidadoCompetencias from '@features/Modulo2/Components/VisualizaciónBrechasTrabajadorRRHH/ConsolidadoCompetencias';
import DetalleCompetenciasArea from '@features/Modulo2/Components/VisualizaciónBrechasTrabajadorRRHH/DetalleCompetenciasArea';
import GestionCompetencia from '@features/Modulo2/Components/VisualizaciónBrechasTrabajadorRRHH/GestionCompetencias';

const App = () => {

  const content = useRoutes(routes);

  return (
    <>
      {/*
      <AuthProvider>
        <Authenticated>
          { content }
        </Authenticated>
      </AuthProvider>
      */
      }
      <GestionCompetencia></GestionCompetencia>
    </>

  )
}

export default App;