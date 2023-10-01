import { useEffect, useState } from 'react';
import { API } from '~constants/constants.ts';
import { Character } from '~types/types.ts';

export const useListCharacters = (props: { searchTerm: string; page: number }) => {
    const { searchTerm, page } = props;

    const [isLoadingData, setIsLoadingData] = useState(false);
    const [isLoadingImage, setIsLoadingImage] = useState(false);
    const [error, setError] = useState(false);
    const [characters, setCharacters] = useState<Character[]>([]);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        setIsLoadingData(true);
        (async () => {
            try {
                const url = `${API}?page=${page}&name=${searchTerm.trim().toLowerCase()}`;
                const response = await fetch(url);
                const data = await response.json();
                if (data.error) {
                    setTotalPages(1);
                    setCharacters([]);
                } else {
                    setTotalPages(data.info.pages);
                    setCharacters([...data.results]);
                }
            } catch {
                setError(true);
                setTotalPages(1);
                setCharacters([]);
            } finally {
                setIsLoadingData(false);
            }
        })();
    }, [page, searchTerm]);

    return {
        isLoading: isLoadingData,
        error,
        characters,
        setIsLoadingImage,
        isLoadingImage,
    };
};
