
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './Pages/HomePage';
import Login from './Pages/Login';
import Signup from './Components/Signup';
import { MyContent } from './Pages/MyContent';

export const Router = () => {
	return (
		<Routes>
			<Route path="/login" element={<Login />} />
			<Route path="/signup" element={<Signup />} />
			<Route path="/home" element={<HomePage />} />
			<Route path="/content" element={<MyContent />} />
		</Routes>
	);
};

