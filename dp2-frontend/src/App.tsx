import { useState } from 'react'
import { useRoutes } from 'react-router-dom';
import routes from '@config/router';

const App = () => {

  const content = useRoutes(routes);

  return (
    <>
      { content }
    </>
  )
}

export default App;