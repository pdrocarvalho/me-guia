import React from 'react';
import { render } from '@testing-library/react';
import App from './pages/App';

test('renders without crashing', () => {
  const { baseElement } = render(<App />);
  expect(baseElement).toBeDefined();
});
