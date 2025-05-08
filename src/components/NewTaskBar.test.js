import { render, screen } from '@testing-library/react';
import NewTaskBar from './NewTaskBar';

test('renders learn react link', () => {
  render(<NewTaskBar />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
