import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import Login, { logIn } from '../Pages/Login';
import { act } from 'react-dom/test-utils';

vi.mock('axios');

describe('Login page test', () => {
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
		axios.post.mockResolvedValue({
			data: { token: 'abc' },
		});

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

		await act(async () => {
			const data = await logIn(email, password);
			console.log('data', data);
		});

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

		const button = screen.getByRole('button');
		fireEvent.click(button);

		let data;
		await act(async () => {
			data = await logIn('john', 'admin');
			console.log('data', data);
		});

		const error = screen.getByText('User not found');
		expect(error).toBeInTheDocument();
	});

	it('server error should display', async () => {
		render(<Login />, { wrapper: MemoryRouter });
		// e.response.data will throw error
		axios.post.mockRejectedValue({
			oops: '',
		});

		const button = screen.getByRole('button');
		fireEvent.click(button);

		let data;
		await act(async () => {
			data = await logIn('john', 'admin');
			console.log('data', data);
		});
		
		const error = screen.getByText('Server error');
		expect(error).toBeInTheDocument();
	});
});
