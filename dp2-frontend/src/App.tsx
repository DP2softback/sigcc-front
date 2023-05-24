import { useState } from 'react'
import { useRoutes } from 'react-router-dom';
import routes from '@config/router';
import Login from '@features/Modulo2/Components/Login/Login';
import AgregarCompetencia from '@features/Modulo2/Components/Gestion de Competencias/Create';
import CompetenciasListar from '@features/Modulo2/Components/Gestion de Competencias/Read';

const App = () => {

  const content = useRoutes(routes);

  return (
    <>
      { // content 
      }
      {<Login></Login> 
      } 
      {
        //<CompetenciasListar></CompetenciasListar>
      }

    </>
  )
}

export default App;