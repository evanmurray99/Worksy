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
						navigate('/'); // !change later
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
			<div className="bg-gray-100 h-screen w-full">
				<form
					className="max-w-[400px] w-full mx-auto bg-white p-4"
					onSubmit={logIn}
				>
					<div className="text-center py-6">
						<h1 className="text-2xl font-bold text-center">LOGIN</h1>
						<p>Welcome back. Sign into your account</p>
					</div>
					<div className="flex flex-col py-2">
						<label htmlFor="email">Email</label>
						<input
							className="border p-2"
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
							className="border p-2"
							type="password"
							id="password"
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
							}}
						/>
					</div>
					<button className="border w-full my-5 py-2 bg-black hover:bg-gray-800 text-white">
						Sign in
					</button>
					<Link className="flex justify-center" to="signup">
						Create an account
					</Link>
				</form>
			</div>
		</>
	);
}
