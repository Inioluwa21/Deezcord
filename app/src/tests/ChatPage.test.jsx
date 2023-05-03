import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import ChatPage from '../pages/ChatPage';

describe('Chat Page', () => {
  it('should render the chat page without crashing', () => {
    render(<ChatPage />);
  });
  it('should should have DEEZCORD ADMIN in the page', () => {
    render(<ChatPage />);
    expect(screen.getByPlaceholderText('DEEZCORD')).toBeInTheDocument();
  });
});
