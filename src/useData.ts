import axios, {AxiosError, AxiosRequestConfig} from 'axios';
import {Dispatch, SetStateAction, useEffect, useState} from 'react';

interface DataOut {
    data: object,
    loading: boolean,
    setEndpoint: Dispatch<SetStateAction<string>>,
    setConfig: Dispatch<SetStateAction<AxiosRequestConfig>>,
    error: string,
    message: string
}

const useData = (): DataOut => {

    const [endpoint, setEndpoint] = useState<string>('');
    const [config, setConfig] = useState<AxiosRequestConfig>({});
    const [data, setData] = useState<object>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        let _alive = true;
        setLoading(true);

        if (endpoint !== '') {
            axiosGet(endpoint, config)

                .then(response => {
                    console.log('Axios: %o', response);
                    if (_alive) {
                        setData(response.data);
                        if ( response.status === 206) {
                            setMessage('Not all IDS returned. ' + response.statusText)
                        }
                    }
                })
                .catch((error: AxiosError) => {
                console.log('Api Error: %o', error);
                setError(error.message);
            });
        }

        setLoading(false);

        return () => {
            _alive = false;
        }
    }, [endpoint, config]);

    return {data, loading, setEndpoint, setConfig, error, message};
};

async function axiosGet(url: string, config?: object): Promise<any> {
    const defaultConfig = {
        baseURL: 'https://api.guildwars2.com/v2/',
        headers: {
            // 'User-Agent': "Landfill GW2 React App"
        }
    };

    return await axios.get(url, {...defaultConfig, ...config});
}

export default useData;