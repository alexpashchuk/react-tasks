import { useEffect, useMemo, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import { API } from '~constants/constants.ts';
import { Character } from '~types/types.ts';
import { ListCharactersProps } from '~components/ListCharacters/ListCharacters.tsx';

export const useListCharacters = (props: ListCharactersProps) => {
    const { skip, setSkip } = props;
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();
    const pageQuery = parseInt(searchParams.get('page') || '1');
    const isPage = searchParams.get('page') || '';
    const searchQuery = searchParams.get('search') || '';
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [isLoadingImage, setIsLoadingImage] = useState(false);
    const [error, setError] = useState(false);
    const [characters, setCharacters] = useState<Character[]>([]);
    const [totalPages, setTotalPages] = useState(42);
    const initialPage = pageQuery <= 0 || pageQuery > totalPages || isNaN(pageQuery);
    const [page, setPage] = useState(initialPage ? 1 : pageQuery);
    // const [params, setParams] = useState<Params>({ search: searchQuery, page: pageQuery });

    const currentPage = useMemo(() => {
        if (isPage) {
            setPage(pageQuery);
            return pageQuery;
        } else {
            return page;
        }
    }, [isPage, page, pageQuery]);

    useEffect(() => {
        if (location.pathname === '/characters' && !location.search) {
            searchParams.set('page', '1');
            setSearchParams(searchParams);
        }
    }, [location.pathname, location.search, searchParams, setSearchParams]);

    useEffect(() => {
        if (initialPage) {
            searchParams.set('page', '1');
            setSearchParams(searchParams);
        }
    }, [initialPage, searchParams, setSearchParams]);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoadingData(true);
            try {
                const url = `${API}?page=${pageQuery}&name=${searchQuery.trim().toLowerCase()}`;
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
        };
        if (!skip) {
            fetchData();
        }
    }, [skip, pageQuery, searchQuery, setTotalPages]);

    const handlePageChange = (page: number): void => {
        setSkip(false);
        searchParams.set('page', `${page}`);
        setSearchParams(searchParams);
    };

    const changePage = (page: number): void => {
        setSkip(false);
        searchParams.set('page', `${page}`);
        setSearchParams(searchParams);
    };

    return {
        isLoading: isLoadingData,
        error,
        characters,
        setIsLoadingImage,
        isLoadingImage,
        totalPages,
        handlePageChange,
        changePage,
        pageQuery,
        currentPage,
    };
};
