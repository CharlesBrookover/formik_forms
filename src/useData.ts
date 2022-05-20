import axios from 'axios';
import {Dispatch, SetStateAction, useEffect, useState} from 'react';

interface DataOut {
    data: object,
    loading: boolean,
    setSearchId: Dispatch<SetStateAction<number>>
}

const useData = (): DataOut => {

    const [searchId, setSearchId] = useState<number>(0);
    const [data, setData] = useState<any>({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let _alive = true;
        setLoading(true);

        if (searchId !== 0) {
            axiosGet('/items', {params: {ids: searchId}}).then(response => {
                console.log('Status: %d Text: %s', response.status, response.statusText)
                if (_alive) {
                    setData(response.data);
                }
            }).catch(error => console.log('AXIOS Error: %o', error))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }

        return () => {
            _alive = false;
        }
    }, [searchId]);

    return {data, loading, setSearchId};
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