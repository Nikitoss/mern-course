import {useCallback, useState} from 'react';

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true);

        try {
            headers['Content-Type'] = 'application/json';
            const response = await fetch(url, {method, body: body && JSON.stringify(body), headers});
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Что-то пошло не так')
            }

            return data;
        } catch (e) {
            setError(e.message);
            throw e;
        } finally {
            setLoading(false);
        }
    }, []);

    const clearError = () => setError(null);

    return {loading, request, error, clearError, setError};
}