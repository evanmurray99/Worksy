import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Services from './Pages/Services';
import MyContent from './Pages/MyContent';
import './App.css'

function App() {
	return (
		<>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/home" element={<Home />} />
				<Route path="/content" element={<MyContent />} />
				<Route path="/services/:query" element={<Services />} />
			</Routes>
		</>
	);
}

export default App;
