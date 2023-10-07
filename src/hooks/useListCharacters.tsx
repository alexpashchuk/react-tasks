import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { API } from '~constants/constants.ts';
import { Character } from '~types/types.ts';

type Params = {
    search?: string;
    page?: string;
};

export const useListCharacters = (props: { searchTerm: string }) => {
    const { searchTerm } = props;
    const [_, setSearchParams] = useSearchParams();
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [isLoadingImage, setIsLoadingImage] = useState(false);
    const [error, setError] = useState(false);
    const [characters, setCharacters] = useState<Character[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const params: Params = {};
        if (searchTerm) params.search = searchTerm;
        if (page) params.page = page.toString();
        setSearchParams(params);
    }, [page, searchTerm, setSearchParams]);

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

    const handlePageChange = (page: number): void => {
        setPage((prevPage: number) => prevPage + page);
    };

    return {
        isLoading: isLoadingData,
        error,
        characters,
        setIsLoadingImage,
        isLoadingImage,
        totalPages,
        page,
        handlePageChange,
    };
};
