import { render, screen, cleanup } from '@testing-library/react';
import App from './App';

test('to check in the input feild', () => {
  render(<App />);
  const app = screen.getByTextId('country');
  expect(app).toBeInTheDocument();
});
