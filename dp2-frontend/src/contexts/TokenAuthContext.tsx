import { createContext, useEffect, useReducer } from 'react';
import axios from '@config/axios';
import PropTypes from 'prop-types';
import axiosInt from '@config/axios';

const initialAuthState = {
    isAuthenticated: false,
    isInitialized: false,
    user: null,
    role: null
};

const setSession = (accessToken) =>
{
    if (accessToken)
    {
        localStorage.setItem('accessToken', accessToken);
    } else
    {
        localStorage.removeItem('accessToken');
    }
};

const handlers = {
    INITIALIZE: (state, action) =>
    {
        const { isAuthenticated, user, role } = action.payload;

        return {
            ...state,
            isAuthenticated,
            isInitialized: true,
            user,
            role
        };
    },
    LOGIN: (state, action) =>
    {
        const { user, role } = action.payload;

        return {
            ...state,
            isAuthenticated: true,
            user,
            role
        };
    },
    LOGOUT: (state) => ({
        ...state,
        isAuthenticated: false,
        user: null
    }),
    REGISTER: (state, action) =>
    {
        const { user } = action.payload;

        return {
            ...state,
            isAuthenticated: true,
            user
        };
    }
};

const reducer = (state, action) =>
    handlers[action.type] ? handlers[action.type](state, action) : state;

const AuthContext = createContext({
    ...initialAuthState,
    method: 'Token',
    login: (email: string, password: string) => Promise.resolve(),
    logout: () => Promise.resolve(),
    register: () => Promise.resolve()
});

export const AuthProvider = (props) =>
{
    const { children } = props;
    const [state, dispatch] = useReducer(reducer, initialAuthState);

    useEffect(() =>
    {
        const initialize = async () =>
        {
            try
            {
                const accessToken = window.localStorage.getItem('accessToken');

                if (accessToken)
                {
                    setSession(accessToken);
                    const role = window.localStorage.getItem('role');
                    dispatch({
                        type: 'INITIALIZE',
                        payload: {
                            isAuthenticated: true,
                            user: null,
                            role: role
                        }
                    });
                } else
                {
                    dispatch({
                        type: 'INITIALIZE',
                        payload: {
                            isAuthenticated: false,
                            user: null
                        }
                    });
                }
            } catch (err)
            {
                console.error(err);
                dispatch({
                    type: 'INITIALIZE',
                    payload: {
                        isAuthenticated: false,
                        user: null
                    }
                });
            }
        };

        initialize();
    }, []);

    const login = async (email, password) =>
    {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        const response = await axiosInt.post('/v1/login', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(response.status)

        if (response.status === 200)
        {
            setSession(response.data['token']);
            dispatch({
                type: 'LOGIN',
                payload: {
                    email: email, password: password
                }
            });
        } else
        {
            throw new Error("Las credenciales son incorrectas")
        }
    };

    const logout = async () =>
    {
        setSession(null);
        dispatch({ type: 'LOGOUT' });
    };

    const register = async (email, name, password) =>
    {
        const response = await axios.post('/api/account/register', {
            email,
            name,
            password
        });
        const { accessToken, user } = response.data;

        window.localStorage.setItem('accessToken', accessToken);
        dispatch({
            type: 'REGISTER',
            payload: {
                user
            }
        });
    };

    return (
        <AuthContext.Provider
            value={{
                ...state,
                method: 'Token',
                login,
                logout,
                register
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default AuthContext;
