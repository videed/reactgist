import React from 'react';
import { render, screen } from '@testing-library/react';
import GistCard from './GistCard';

const GistMock = {
    created_at: '2021-02-25T17:07:45Z',
    description: 'Function syntaxes supported by TypeScript',
    files: {
        'README.md': {
            filename: 'README.md',
            language: 'Markdown',
            raw_url:
                'https://gist.githubusercontent.com/kentcdodds/61176c067ec525…0120d/raw/1c45540476f57729488831378f66418b99830546/README.md',
            size: 3631,
            type: 'text/markdown',
        },
    },
    forks_url: 'https://api.github.com/gists/61176c067ec5250b5bd3c7fe57a0120d/forks',
    html_url: 'https://gist.github.com/61176c067ec5250b5bd3c7fe57a0120d',
    id: '61176c067ec5250b5bd3c7fe57a0120d',
    url: 'https://api.github.com/gists/61176c067ec5250b5bd3c7fe57a0120d',
};

test('renders GistCard properly', () => {
    render(<GistCard gist={GistMock} />);
    const cardTitle = screen.getByText(/README.md/i);
    const fileType = screen.getByText(/Markdown/i);
    const creationDate = screen.getByText(/Feb 25, 2021/i);

    expect(cardTitle).toBeInTheDocument();
    expect(fileType).toBeInTheDocument();
    expect(creationDate).toBeInTheDocument();
});
