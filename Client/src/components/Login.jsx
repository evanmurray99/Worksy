import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
// import axios from 'axios';

export default function Login() {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const logIn = async (e) => {
		e.preventDefault();
		setError('');
		const url = 'http://localhost:3001/api/users/login';
		await fetch(url, {
			method: 'POST',
			body: JSON.stringify({
				email: email,
				password: password,
			}),
			headers: {
				'Content-type': 'application/json',
			},
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				if (data.token) {
					document.cookie = 'token=' + data.token;
					navigate('/');
				} else {
					// console.log(data.message);
					setError(data.message);
				}
			});
	};
	return (
		<>
			<div className="rounded-lg bg-white p-8 shadow-xl mx-28 my-[300px] ">
				<form
					className=" bg-white p-4 my-10 max-w-[400px] w-full mx-auto"
					onSubmit={logIn}
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
		</>
	);
}
