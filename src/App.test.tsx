import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app initial elements', () => {
    render(<App />);
    const formElement = screen.getByPlaceholderText(/GitHub Username/i);
    const emptyState = screen.getByText(/Enter GitHub username to see their public Gists./i);
    const loadMoreButton = screen.queryByText(/load more/i);
    expect(formElement).toBeInTheDocument();
    expect(emptyState).toBeInTheDocument();
    expect(loadMoreButton).toBeNull();
});
