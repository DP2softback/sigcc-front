import { useState } from 'react'
import { useRoutes } from 'react-router-dom';
import { AuthProvider } from '@contexts/JWTAuthContext';
import routes from '@config/router';
import Authenticated from '@components/Authenticated';
import DetalleCompetenciasArea from '@features/Modulo2/Components/VisualizaciónBrechasTrabajadorRRHH/DetalleCompetenciasArea';

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

      <DetalleCompetenciasArea></DetalleCompetenciasArea>


    </>
  )
}

export default App;