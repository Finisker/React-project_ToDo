import { render, screen } from '@testing-library/react';
import TaskDisplay from './TaskDisplay';

test('renders learn react link', () => {
  render(<TaskDisplay />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
