import { render, screen } from '@testing-library/react';

import App from './App';

test('should render App component', () => {
  render(<App />);
  const pElement = screen.getByTestId('p-element');
  expect(pElement).toBeInTheDocument();
  expect(pElement).toHaveTextContent('Edit src/App.tsx and save to reload');
});
