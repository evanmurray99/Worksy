import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Account from './components/Account';
import Posts from './components/Posts';
import Home from './components/Home';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/account" element={<Account />} />
				<Route path="/services" element={<Posts />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
