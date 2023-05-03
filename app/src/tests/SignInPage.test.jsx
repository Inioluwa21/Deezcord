import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import SignInPage from '../pages/SignInPage';
describe('Sign in Page', () => {
  it('should render the landing page without crashing', () => {
    render(<SignInPage />);
  });
  it('should should have _ in the page', () => {
    render(<SignInPage />);
    expect(screen.getByPlaceholderText('Sign In')).toBeInTheDocument();
  });
});
