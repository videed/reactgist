import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Toolbar from './Toolbar';

test('renders Toolbar with predefined username', () => {
    render(<Toolbar username="test-user-name" onUsernameChange={(newUsername) => {}} />);
    const formElement = screen.getByDisplayValue(/test-user-name/i);
    expect(formElement).toBeInTheDocument();
});

test('react to the form change in the Toolbar', () => {
    const handleFormChaange = jest.fn();
    render(<Toolbar username="test-user-name" onUsernameChange={handleFormChaange} />);
    fireEvent.change(screen.getByPlaceholderText(/GitHub Username/i), { target: { value: 'new-user-name' } });
    const formElementAfter = screen.getByDisplayValue(/new-user-name/i);
    expect(formElementAfter).toBeInTheDocument();
    expect(handleFormChaange).toHaveBeenCalledWith('new-user-name');
});
