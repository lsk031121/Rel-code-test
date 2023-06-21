import { useState, useRef, useEffect } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

export interface Props {
  method: string;
  url: string;
}

const useAxios = <T>(props: Props) => {
  const { method, url } = props;
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string>("");
  const [loaded, setLoaded] = useState<boolean>(false);
  const controllerRef = useRef<AbortController>(new AbortController());

  const cancel = () => {
    controllerRef.current.abort();
  };

  useEffect(() => {
    (async () => {
      try {
        const config: AxiosRequestConfig = {
          method,
          url,
          signal: controllerRef.current.signal,
        };

        const response = await axios.request<T>(config);

        setData(response.data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoaded(true);
      }
    })();

    return () => {
      cancel();
    };
  }, [method, url]);

  return { cancel, data, error, loaded };
};

export default useAxios;