import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

export const logIn = async (email, password) => {
	try {
		console.log("login")
		const url = 'http://localhost:3001/api/users/login';
		const body = {
			email: email,
			password: password,
		};
		return await axios
			.post(url, body)
			.then((response) => response.data)
			.catch((e) => e.response.data);
	} catch (e) {
		console.log('Error occured', e.message);
	}
};

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		setError('');
		const data = await logIn(email, password);

		try {
			console.log(data.token)
			if (data.token) {
				Cookies.set('token', data.token)
				console.log(data.token)
				navigate('/');
			} else if (data.message) setError(data.message);
		} catch (e) {
			setError('Server error');
		}
	};

	const handleEnter = (event) => {
		if(event.key === "Enter")
		{
			handleLogin(event);
		}
	}

	return (
		<div className="justify-center items-center flex h-full">
			<div className="flex justify-center items-center rounded-xl bg-white p-8 shadow-xl w-[400px] max-w-[1500px]">
				<form
					className=" bg-white w-full mx-auto"
					onSubmit={handleLogin}
					onKeyDown={handleEnter}
				>
					<div className="text-center py-6 text-gray-700">
						<h1 className="text-2xl font-bold mb-4">LOGIN</h1>
						<p>Welcome back. Sign into your account</p>
					</div>
					<div className="flex flex-col py-2">
						<label htmlFor="email">Email</label>
						<input
							className="border p-2 focus:outline-gray-400 "
							type="email"
							id="email"
							value={email}
							placeholder="Email"
							onChange={(e) => {
								setEmail(e.target.value);
								setError('');
							}}
						/>
					</div>

					<div className="flex flex-col py-2">
						<label htmlFor="password">Password</label>
						<input
							className="border p-2 focus:outline-gray-400 "
							type="password"
							id="password"
							value={password}
							placeholder="Password"
							onChange={(e) => {
								setPassword(e.target.value);
								setError('');
							}}
						/>
					</div>
					<button className="border w-full my-5 py-2 bg-gray-700 hover:bg-gray-500  text-white">
						Sign in
					</button>
					<Link
						className="flex justify-center hover:text-gray-500"
						to="/signup"
					>
						Create an account
					</Link>
					{error !== '' ? <div className="text-red-400">{error}</div> : null}
				</form>
			</div>
		</div>
	);
}
