import { useCallback, useEffect, useState } from 'react';
import { SetURLSearchParams, useSearchParams } from 'react-router-dom';

import { API } from '~constants/constants.ts';
import { Character } from '~types/types.ts';

type Params = {
    search?: string;
    page?: string;
};

export const useListCharacters = (props: {
    searchTerm: string;
    searchParams: URLSearchParams;
    setSearchParams: SetURLSearchParams;
}) => {
    const { searchTerm, searchParams, setSearchParams } = props;
    // const [searchParams, setSearchParams] = useSearchParams();
    const pageQuery = Number(searchParams.get('page') || '1');
    const searchQuery = searchParams.get('search') || '';
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [isLoadingImage, setIsLoadingImage] = useState(false);
    const [error, setError] = useState(false);
    const [characters, setCharacters] = useState<Character[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(pageQuery <= 0 || isNaN(pageQuery) ? 1 : pageQuery);
    // const [params, setParams] = useState<Params>({ search: searchQuery, page: pageQuery });

    useEffect(() => {
        searchParams.set('page', '1');
        setSearchParams(searchParams, {
            replace: true,
        });
    }, [pageQuery, searchParams, searchQuery, setSearchParams]);

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
