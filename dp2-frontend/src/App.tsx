import { useState } from 'react'
import { useRoutes } from 'react-router-dom';
import { AuthProvider } from '@contexts/JWTAuthContext';
import routes from '@config/router';
import Authenticated from '@components/Authenticated';
import PieChart from '@features/Modulo2/Components/VisualizaciónBrechasTrabajadorRRHH/ConsolidadoCompetencias';
import CompetenciasListar from '@features/Modulo2/Components/GestionDeCompetencias/Read';

const App = () => {

  const content = useRoutes(routes);

  return (
    <>
      {
        /*

      <AuthProvider>
        <Authenticated>
          { content }
        </Authenticated>
      </AuthProvider>
      */
      }

      {
        //<PieChart></PieChart>
        <CompetenciasListar></CompetenciasListar>
      }

    </>
  )
}

export default App;