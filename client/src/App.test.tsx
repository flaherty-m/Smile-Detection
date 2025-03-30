import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

test('renders the app and toggles capturing', async () => {
  render(<App />);
  
  // Check that the button renders with "Start Capturing"
  const button = screen.getByRole('button', { name: /start capturing/i });
  expect(button).toBeInTheDocument();

  // Simulate clicking the button to start capturing
  fireEvent.click(button);
  
  // Now the button should change to "Stop Capturing"
  expect(screen.getByRole('button', { name: /stop capturing/i })).toBeInTheDocument();
});
