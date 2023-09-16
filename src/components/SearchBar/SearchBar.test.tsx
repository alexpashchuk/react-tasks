import { render, screen } from '@testing-library/react';
import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import SearchBar from './SearchBar.tsx';

export class LocalStorageMock {
    store: Record<string, string>;

    constructor() {
        this.store = {};
    }

    clear() {
        this.store = {};
    }

    get length() {
        return Object.keys(this.store).length;
    }

    getItem(key: string) {
        return this.store[key] || null;
    }

    setItem(key: string, value: unknown) {
        this.store[key] = String(value);
    }

    removeItem(key: string) {
        delete this.store[key];
    }
}

describe('searchBar', () => {
    const user = userEvent.setup();
    const testText = 'value';
    const handleInput = vi.fn();
    beforeEach(() => {
        vi.stubGlobal('localStorage', new LocalStorageMock());
        render(<SearchBar handleInput={handleInput} />);
    });
    afterEach(() => {
        vi.unstubAllGlobals();
    });
    it('set value to input', async () => {
        const input = screen.getByRole('searchbox') as HTMLInputElement;
        await user.type(input, testText);
        expect(input.value).toStrictEqual(testText);
    });
});

describe('rerender', () => {
    const user = userEvent.setup();
    const testText = 'rerender value';
    const LSKey = 'search-value';
    const handleInput = vi.fn();

    beforeEach(() => {
        vi.stubGlobal('localStorage', new LocalStorageMock());
    });

    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it('set value to localStorage on unMount', async () => {
        const { unmount } = render(<SearchBar handleInput={handleInput} />);
        const input = screen.getByRole('searchbox') as HTMLInputElement;
        await user.type(input, testText);
        unmount();
        expect(localStorage.getItem(LSKey)).toStrictEqual(testText);
    });
    it('writes value to localStorage on refresh', async () => {
        render(<SearchBar handleInput={handleInput} />);
        const input = screen.getByRole('searchbox') as HTMLInputElement;
        await user.type(input, testText);
        window.dispatchEvent(new Event('beforeunload'));
        expect(localStorage.getItem(LSKey)).toBe(testText);
    });
    it('takes value from localStorage', async () => {
        localStorage.setItem(LSKey, testText);
        render(<SearchBar handleInput={handleInput} />);
        const input = screen.getByRole('searchbox') as HTMLInputElement;
        expect(input.value).toStrictEqual(testText);
    });
});
