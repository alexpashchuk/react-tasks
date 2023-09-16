import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Footer from './Footer';

describe('Footer tests', () => {
    beforeEach(() => {
        act(() => {
            render(<Footer />);
        });
    });
    it('renders link', () => {
        const githubLink = screen.getByTestId('git');
        const rsLink = screen.getByTestId('rs');

        expect(githubLink).toBeInTheDocument();
        expect(githubLink).toHaveAttribute('href', 'https://github.com/alexpashchuk');

        expect(rsLink).toBeInTheDocument();
        expect(rsLink).toHaveAttribute('href', 'https://rs.school/react');
    });

    it('should render links correctly', () => {
        expect(screen.getAllByRole('link')).toHaveLength(2);
    });
});
