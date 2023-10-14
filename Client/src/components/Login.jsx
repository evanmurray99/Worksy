import { Link } from 'react-router-dom';

export default function Login() {
	return (
		<>
			<div className="bg-gray-100 h-screen w-full">
				<form className="max-w-[400px] w-full mx-auto bg-white p-4">
					<div className="text-center py-6">
						<h1 className="text-2xl font-bold text-center">LOGIN</h1>
						<p>Welcome back. Sign into your account</p>
					</div>
					<div className="flex flex-col py-2">
						<label htmlFor="">Email</label>
						<input className="border p-2" type="email" />
					</div>

					<div className="flex flex-col py-2">
						<label htmlFor="">Password</label>
						<input className="border p-2" type="password" />
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
