import { useEffect, useState } from 'react';
import { API } from '~constants/constants.ts';
import { Character } from '~types/types.ts';

export const useCharacterDetail = (id: string) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [character, setCharacter] = useState<Character>();

    useEffect(() => {
        setIsLoading(true);
        (async () => {
            try {
                const url = `${API}/${id}`;
                const response = await fetch(url);
                const data = await response.json();
                setCharacter(data);
            } catch {
                setError(true);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [id]);

    return {
        isLoading,
        error,
        character,
    };
};
