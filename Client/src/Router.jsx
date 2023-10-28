
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import { MyContent } from './Pages/MyContent';

export const Router = () => {
	return (
		<Routes>
			<Route path="/login" element={<Login />} />
			<Route path="/signup" element={<Signup />} />
			<Route path="/home" element={<Home />} />
			<Route path="/content" element={<MyContent />} />
		</Routes>
	);
};

