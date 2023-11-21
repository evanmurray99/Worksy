import { useState} from 'react';
import { Link, Route, redirectDocument, useNavigate} from 'react-router-dom';
import studentImg from '../assets/students.jpg';
import hireImg from '../assets/hirers.jpg';
import axios from 'axios';

const isValidEmail = (email, isStudent) => {
    
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    
    if (isStudent) {
      return email.endsWith('@myumanitoba.ca') && emailRegex.test(email);
    } else {

      return emailRegex.test(email);
    }
};

export const signUp = async (firstName, lastName, email, isStudent, password) => {
	try {
		const url = 'http://localhost:3001/api/users/';
		const body = {
			firstName: firstName,
			lastName: lastName,
			email: email,
			isStudent: isStudent,
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

export default function Signup() {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [isStudent, setIsStudent] = useState(false);
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();
		setError('');
		//check if passwords match before sending to backend
		if (password !== confirmPassword ) {
			setError('Passwords do not match');
			return;
		}

		//check if email is valid before sending to backend
		if (!isValidEmail(email, isStudent)) {
			setError('Must use a student email!');
			return;
		}

		const data = await signUp(firstName, lastName, email, isStudent, password);
		
		try{
			if (data.message) {
				setError(data.message);
			} 
			else {
				navigate('/login');
			}
		} catch (error) {
			setError('An error occurred while registering');
		}
	};

	const handleEnter = (event) => {
		if(event.key === "Enter")
		{
			handleSubmit(event);
		}
	}

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
				<form
					className="bg-white p-4 my-10 max-w-[500px] w-full mx-auto"
					onSubmit={handleSubmit}
					onKeyDown={handleEnter}
				>
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
								required={true}
								value={firstName}
								placeholder='First name'
								onChange={(event) => setFirstName(event.target.value)}
							/>
						</div>
						<div className="flex flex-col py-2">
							<label htmlFor="email">Last name</label>
							<input
								className="border p-2 focus:outline-gray-400 "
								type="text"
								id="lastname"
								required={true}
								value={lastName}
								placeholder='Last name'
								onChange={(event) => setLastName(event.target.value)}
							/>
						</div>
					</div>
					<div className="flex flex-col py-2">
						<label htmlFor="email">Email</label>
						<input
							className="border p-2 focus:outline-gray-400 "
							type="email"
							id="email"
							required={true}
							value={email}
							placeholder='Email'
							onChange={(event) => setEmail(event.target.value)}
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
								checked={isStudent}
								placeholder='Is student'
								onChange={(event) => setIsStudent(event.target.checked)}
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
							required={true}
							value={password}
							placeholder='Password'
							onChange={(event) => setPassword(event.target.value)}
						/>
					</div>
					<div className="flex flex-col py-2">
						<label htmlFor="password">Re-type password</label>
						<input
							className="border p-2 focus:outline-gray-400 "
							type="password"
							id="password"
							required={true}
							value={confirmPassword}
							placeholder='Confirm password'
							onChange={(event) => setConfirmPassword(event.target.value)}
						/>
					</div>
					{error && <div className="text-red-500">{error}</div>}
					<button className="border w-full my-5 py-2 bg-gray-700 hover:bg-gray-500  text-white">
						Create account
					</button>
					<Link
						className="flex justify-center hover:text-gray-500"
						to="/login"
					>
						Already have account? Sign in
					</Link>
				</form>
			</div>
		</>
	);
}
