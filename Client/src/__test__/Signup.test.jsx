import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import Signup, {signUp} from '../Pages/Signup';
import { act } from 'react-dom/test-utils';

vi.mock('axios');

describe('Signup page test', () => {
	it('signup page should render', () => {
		render(<Signup />, { wrapper: MemoryRouter });
	});

	it('input fields should exist', () => {
		render(<Signup />, { wrapper: MemoryRouter });

        const firstName = screen.getByPlaceholderText('First name');
        const lastName = screen.getByPlaceholderText('Last name');
        const email = screen.getByPlaceholderText('Email');
        const password = screen.getByPlaceholderText('Password');
        const confirmPassword = screen.getByPlaceholderText('Confirm password');

        expect(firstName).toBeInTheDocument();
        expect(lastName).toBeInTheDocument();
        expect(email).toBeInTheDocument();
        expect(password).toBeInTheDocument();
        expect(confirmPassword).toBeInTheDocument();
	});

    it('Create new account', async () => {
        render(<Signup />, { wrapper: MemoryRouter });
        axios.post.mockResolvedValue({
            data: { firstName : 'John', lastName : 'Doe', email : '123@123.com'}
        });

        const body = {
            firstName : 'John',
            lastName : 'Doe',
            email : '123@123.com',
            isStudent : false,
            password : '123'
        };

        const firstName = screen.getByPlaceholderText('First name');
        const lastName = screen.getByPlaceholderText('Last name');
        const email = screen.getByPlaceholderText('Email');
        const password = screen.getByPlaceholderText('Password');
        const client = document.getElementById('client');

        fireEvent.change(firstName, { target: { value: 'John' } });
        fireEvent.change(lastName, { target: { value: 'Doe' } });
        fireEvent.change(email, { target: { value: '123@123.com' } });
        fireEvent.change(password, { target: { value: '123' } });
        fireEvent.click(client)

        await act(async () => {
            const data = await signUp(firstName, lastName, email, false, password);
        });   
    });
});