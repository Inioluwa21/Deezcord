import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import RegisterPage from '../pages/RegisterPage';

describe('Register Page', () => {
  it('should render the  page without crashing', () => {
    render(<RegisterPage />);
  });
  it('should should have DEEZCORD ADMIN in the page', () => {
    render(<RegisterPage />);
    expect(
      screen.getByPlaceholderText('Create An Account')
    ).toBeInTheDocument();
  });
});
