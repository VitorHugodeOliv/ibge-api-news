import { createContext } from 'react';
import { ApiContextType } from '../types';

const ApiContext = createContext({} as ApiContextType);

export default ApiContext;
