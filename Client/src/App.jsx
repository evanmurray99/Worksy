import { Routes, Route } from 'react-router-dom';
import {useState, useEffect} from 'react';
import Chat from './Pages/Chat'
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Services from './Pages/Services';
import MyContent from './Pages/MyContent';
import Cookies from 'js-cookie';
import './App.css'

function App() {
	const [user, setUser] = useState();
	const [token, setToken] = useState();

	var updateToken = (newToken) =>
	{
		console.log("login")
		if(newToken !== '')
		{
			Cookies.set('token', newToken);
			setToken(newToken);
		}
		else
		{
			Cookies.remove('token');
			setToken('');
		}
	}

	useEffect(() => {
		const validateUser = async () => {
		setToken(Cookies.get('token'));
		const url = 'http://localhost:3001/api/users/' + token + '/auth';
		// do a check token before request
		await fetch(url, {
			method: 'GET',
		})
			.then((response) => {
				if (response.status === 200) return response.json();
				else {
					navigate('/login');
				}
			})
			.then((data) => {
				setUser(data.user);
			})
			.catch((e) => console.log(e.message));
		}
		validateUser();
	}, [token]);

	return (
		<>
			<Routes>
				<Route path="/login" element={<Login setToken={updateToken}/>} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/" element={<Home user={user} setToken={updateToken} token={token}/>} />
				<Route path="/content" element={<MyContent user={user} setUser={setUser} token={token} setToken={updateToken}/>} />
				<Route path="/services/:query" element={<Services user={user} setToken={updateToken} token={token}/>} />
				<Route path="/chat" element={<Chat token={token} setToken={updateToken} user={user}/>}/>
			</Routes>
		</>
	);
}

export default App;