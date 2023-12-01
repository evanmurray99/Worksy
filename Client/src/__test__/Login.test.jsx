import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import Login from '../Pages/Login';
import { act } from 'react-dom/test-utils';

vi.mock('axios');

describe('Login page test', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});
	it('login page should render', () => {
		render(<Login />, { wrapper: MemoryRouter });
	});

	it('input fields should exist', () => {
		render(<Login />, { wrapper: MemoryRouter });
		const email = screen.getByPlaceholderText('Email');
		const password = screen.getByPlaceholderText('Password');
		expect(email).toBeInTheDocument();
		expect(password).toBeInTheDocument();
	});

	it('input fields should change', () => {
		render(<Login />, { wrapper: MemoryRouter });
		const email = screen.getByPlaceholderText('Email');
		const password = screen.getByPlaceholderText('Password');
		fireEvent.change(email, { target: { value: 'johnD@myumanitoba.ca' } });
		fireEvent.change(password, { target: { value: 'admin' } });
		expect(email).toBeInTheDocument();
		expect(email).toHaveValue('johnD@myumanitoba.ca');
		expect(password).toBeInTheDocument();
		expect(password).toHaveValue('admin');
	});

	it('valid login should return a token', async () => {
		render(<Login />, { wrapper: MemoryRouter });
		// axios.post.mockResolvedValue({
		// 	data: { token: 'abc' },
		// });

		const body = {
			email: 'johnD@myumanitoba.ca',
			password: 'admin',
		};

		const email = screen.getByPlaceholderText('Email');
		const password = screen.getByPlaceholderText('Password');

		fireEvent.change(email, { target: { value: 'johnD@myumanitoba.ca' } });
		fireEvent.change(password, { target: { value: 'admin' } });
		const button = screen.getByRole('button');
		fireEvent.click(button);

		expect(axios.post).toHaveBeenCalledWith(
			'http://localhost:3001/api/users/login',
			body
		);
	});

	it('incorrect email should fail', async () => {
		render(<Login />, { wrapper: MemoryRouter });
		axios.post.mockRejectedValue({
			response: { data: { message: 'User not found' } },
		});

		const email = screen.getByPlaceholderText('Email');
		const password = screen.getByPlaceholderText('Password');

		fireEvent.change(email, { target: { value: 'johnD@myumanitoba.ca' } });
		fireEvent.change(password, { target: { value: 'admin' } });
		const button = screen.getByRole('button');
		fireEvent.click(button);

		await waitFor(() => {
			expect(screen.getByText('User not found')).toBeInTheDocument();
		});
	});

	it('server error should display', async () => {
		render(<Login />, { wrapper: MemoryRouter });
		// e.response.data will throw error
		axios.post.mockRejectedValue({
			oops: '',
		});

		const email = screen.getByPlaceholderText('Email');
		const password = screen.getByPlaceholderText('Password');

		fireEvent.change(email, {
			target: { value: 'johnWillNoResponse@myumanitoba.ca' },
		});
		fireEvent.change(password, { target: { value: 'admin' } });
		const button = screen.getByRole('button');
		await act(async () => {
			fireEvent.click(button);
		});

		const body = {
			email: 'johnWillNoResponse@myumanitoba.ca',
			password: 'admin',
		};

		expect(axios.post).toHaveBeenCalledWith(
			'http://localhost:3001/api/users/login',
			body
		);

		const error = screen.getByText('Server error');
		expect(error).toBeInTheDocument();
	});
});