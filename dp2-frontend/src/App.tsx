import { useState } from 'react'
import { useRoutes } from 'react-router-dom';
import { AuthProvider } from '@contexts/JWTAuthContext';
import routes from '@config/router';
import Authenticated from '@components/Authenticated';
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

      <CompetenciasListar></CompetenciasListar>


    </>
  )
}

export default App;