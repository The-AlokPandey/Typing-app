import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Login from './components/Login';
import Register from './components/Register';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  Link: ({ children }) => children,
  useLocation: () => ({ state: null }),
  useNavigate: () => mockNavigate
}));

afterEach(() => {
  delete global.fetch;
  localStorage.clear();
  mockNavigate.mockReset();
});

test('login submits the controlled credentials to the login route and stores the token', async () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ token: 'test-token', name: 'Taylor' })
  });
  const setUserName = jest.fn();

  render(<Login setUserName={setUserName} />);

  fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'taylor@example.com' } });
  fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'typing123' } });
  fireEvent.click(screen.getByRole('button', { name: 'Log in' }));

  await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/'));
  expect(global.fetch).toHaveBeenCalledWith('/api/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'taylor@example.com', password: 'typing123' })
  });
  expect(localStorage.getItem('token')).toBe('test-token');
  expect(setUserName).toHaveBeenCalledWith('Taylor');
});

test('registration submits the name and credentials to the registration route', async () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ name: 'Taylor', email: 'taylor@example.com' })
  });

  render(<Register />);

  fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Taylor' } });
  fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'taylor@example.com' } });
  fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'typing123' } });
  fireEvent.click(screen.getByRole('button', { name: 'Create account' }));

  await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/login', {
    state: { message: 'Your account is ready. Log in to start practicing.' }
  }));
  expect(global.fetch).toHaveBeenCalledWith('/api/users/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Taylor', email: 'taylor@example.com', password: 'typing123' })
  });
});

test('registration displays the backend error message', async () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: false,
    json: async () => ({ message: 'User already exists' })
  });

  render(<Register />);

  fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Taylor' } });
  fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'taylor@example.com' } });
  fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'typing123' } });
  fireEvent.click(screen.getByRole('button', { name: 'Create account' }));

  expect(await screen.findByRole('alert')).toHaveTextContent('User already exists');
  expect(global.fetch).toHaveBeenCalledTimes(1);
});
