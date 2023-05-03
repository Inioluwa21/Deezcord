import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import SearchPage from '../pages/SearchPage';

describe('Search Page', () => {
  it('should render the landing page without crashing', () => {
    render(<SearchPage />);
  });
  it('should should have _ in the page', () => {
    render(<SearchPage />);
    expect(screen.getByPlaceholderText('Search by String')).toBeInTheDocument();
  });
});
