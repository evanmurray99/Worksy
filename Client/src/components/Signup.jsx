import { Link } from 'react-router-dom';
import studentImg from '../assets/students.jpg';
import hireImg from '../assets/hirers.jpg';

export default function Signup() {
	return (
		<>
			<div className="flex flex-col items-center rounded-lg bg-white p-8 shadow-xl mx-28 my-[300px]">
				<p className="uppercase text-2xl font-bold hidden sm:block ">
					Are you a student or do you hire creatives?
				</p>
				<div className="flex flex-row">
					<div>
						<div>Student</div>
						<img src={studentImg} className="object-contain h-48 w-48"></img>
					</div>
					<div>
						<div>Hirer</div>
						<img src={hireImg} className="object-contain h-48 w-48" />
					</div>
				</div>
				<form className="bg-white p-4 my-10 max-w-[500px] w-full mx-auto">
					<div className="text-center py-6 text-gray-700">
						<h1 className="text-2xl font-bold mb-4 uppercase">Sign up</h1>
						<p>Welcome to Worksy</p>
					</div>
					<div className="flex flex-row justify-between">
						<div className="flex flex-col py-2">
							<label htmlFor="email">First name</label>
							<input
								className="border p-2 focus:outline-gray-400 "
								type="text"
								id="firstname"
							/>
						</div>
						<div className="flex flex-col py-2">
							<label htmlFor="email">Last name</label>
							<input
								className="border p-2 focus:outline-gray-400 "
								type="text"
								id="lastname"
							/>
						</div>
					</div>
					<div className="flex flex-col py-2">
						<label htmlFor="email">Email</label>
						<input
							className="border p-2 focus:outline-gray-400 "
							type="email"
							id="email"
						/>
					</div>
					<div className="flex flex-row gap-10 items-center py-2">
						<p className="text-gray-700">Is student</p>
						<label
							htmlFor="AcceptConditions"
							className="relative h-8 w-14 cursor-pointer [-webkit-tap-highlight-color:_transparent]"
						>
							<input
								type="checkbox"
								id="AcceptConditions"
								className="peer sr-only"
							/>

							<span className="absolute inset-0 rounded-full bg-gray-300 transition peer-checked:bg-gray-500"></span>

							<span className="absolute inset-y-0 start-0 m-1 h-6 w-6 rounded-full bg-white transition-all peer-checked:start-6"></span>
						</label>
					</div>

					<div className="flex flex-col py-2">
						<label htmlFor="password">Password</label>
						<input
							className="border p-2 focus:outline-gray-400 "
							type="password"
							id="password"
						/>
					</div>
					<div className="flex flex-col py-2">
						<label htmlFor="password">Re-type password</label>
						<input
							className="border p-2 focus:outline-gray-400 "
							type="password"
							id="password"
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
				</form>
			</div>
		</>
	);
}
