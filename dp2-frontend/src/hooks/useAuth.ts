import { useContext } from 'react';
import AuthContext from '@contexts/TokenAuthContext';

const useAuth = () => useContext(AuthContext);

export default useAuth;
