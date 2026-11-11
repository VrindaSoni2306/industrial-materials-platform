import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  window.history.replaceState({}, '', '/');
});

test('renders the home page and shared navigation', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /advanced materials for critical applications/i })).toBeInTheDocument();
  expect(screen.getAllByRole('link', { name: 'Request a Quote' })[0]).toBeInTheDocument();
});

test('navigates to the catalogue and filters by grade', () => {
  render(<App />);
  fireEvent.click(screen.getAllByRole('link', { name: 'Products', exact: true })[0]);

  expect(screen.getByRole('heading', { name: /products catalogue/i })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('checkbox', { name: /aerospace grade/i }));
  expect(screen.getByText('Nickel Superalloy Powder')).toBeInTheDocument();
  expect(screen.queryByText('Neodymium Oxide')).not.toBeInTheDocument();
});

test('accepts a contact enquiry and confirms receipt', () => {
  render(<App />);
  fireEvent.click(screen.getAllByRole('link', { name: 'Contact', exact: true })[0]);

  fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Taylor Morgan' } });
  fireEvent.change(screen.getByLabelText(/work email/i), { target: { value: 'taylor@example.com' } });
  fireEvent.change(screen.getByLabelText(/how can we help/i), { target: { value: 'I need material specifications.' } });
  fireEvent.click(screen.getByRole('button', { name: /send enquiry/i }));

  expect(screen.getByRole('heading', { name: /message received/i })).toBeInTheDocument();
});
