import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import AdminPage from '../pages/AdminPage';

describe('Admin Page', () => {
  it('should render the admin page without crashing', () => {
    render(<AdminPage />);
  });
  it('should should have DEEZCORD ADMIN in the page', () => {
    render(<AdminPage />);
    expect(screen.getByPlaceholderText('DEEZCORD ADMIN')).toBeInTheDocument();
  });
});
