import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Account from './components/Account';
import Home from './components/Home';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/account" element={<Account />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
