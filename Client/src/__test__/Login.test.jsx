import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import {describe, it, expect } from 'vitest'
import Login from '../Pages/Login';


it('login page should render', () => {
	render(<Login />, {wrapper: MemoryRouter});
});

it('input fields should change', ()=>{

})



