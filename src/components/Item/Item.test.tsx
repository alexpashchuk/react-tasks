import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Item, { Person } from './Item.tsx';

const mockData: Person = {
    name: 'Darth Vade',
    height: '202',
    mass: '32',
    hair_color: 'none',
    skin_color: 'white',
    eye_color: 'blue',
    birth_year: '33BBY',
    gender: 'male',
    species: [],
    url: 'https://swapi.dev/api/people/4',
};

describe('Item tests', () => {
    it('renders Item', () => {
        render(<Item data={mockData} />);
        expect(screen.getByRole('heading')).toHaveTextContent(mockData.name);
    });
});
