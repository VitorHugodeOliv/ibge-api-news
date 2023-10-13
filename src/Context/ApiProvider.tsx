import { useEffect, useState } from 'react';
import { ApiContextType, ApiType } from '../types';
import { requestApi } from '../Service/api';
import ApiContext from './ApiContext';

type ApiProviderProps = {
  children: React.ReactNode
};
function ApiProvider({ children }: ApiProviderProps) {
  const [data, setData] = useState<ApiType[]>([]);
  console.log('provide', data);

  useEffect(() => {
    requestApi()
      .then((res) => setData(res.items));
  }, []);

  const ibgeData: ApiContextType = { ibgeData: data };

  return (
    <ApiContext.Provider value={ ibgeData }>
      {children}
    </ApiContext.Provider>
  );
}

export default ApiProvider;
