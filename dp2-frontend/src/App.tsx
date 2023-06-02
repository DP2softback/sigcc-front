import { useState } from 'react'
import { useRoutes } from 'react-router-dom';
import { AuthProvider } from '@contexts/JWTAuthContext';
import routes from '@config/router';
import Authenticated from '@components/Authenticated';
import '@assets/scss/App.scss';

const App = () => {

  const content = useRoutes(routes);

  return (
    <>
      <AuthProvider>
        <Authenticated>
          { content }
        </Authenticated>
      </AuthProvider>
    </>
  )
}

export default App;