import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function Login() {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const navigate = useNavigate();

	const logIn = (e) => {
		e.preventDefault();

		const url = 'http://localhost:3001/api/users/login';
		axios
			.post(url, { email: email, password: password })
			.then((response) => {
				if (response.status === 200) {
					setTimeout(() => {
						navigate('/');
					}, 1000);
				}
				window.location.reload();
			})
			.catch((e) => {
				console.log(e.message);
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
							}}
						/>
					</div>
					<button className="border w-full my-5 py-2 bg-gray-700 hover:bg-gray-500  text-white">
						Sign in
					</button>
					<Link className="flex justify-center hover:text-gray-500" to="/signup">
						Create an account
					</Link>
				</form>
			</div>
		</>
	);
}
