import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import LandingPage from '../pages/LandingPage';

describe('Landing Page', () => {
  it('should render the landing page without crashing', () => {
    render(<LandingPage />);
  });
  it('should should have DEEZCORD ADMIN in the page', () => {
    render(<LandingPage />);
    expect(
      screen.getByPlaceholderText(
        'It is created by Inioluwa Olaleye for his 353 project'
      )
    ).toBeInTheDocument();
  });
});
