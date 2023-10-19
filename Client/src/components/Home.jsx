import Navbar from './Navbar';
import Container from './Container';
// import { useEffect } from 'react';
export default function Home() {


	return (
		<>
			<div className="flex flex-row ">
				<Navbar></Navbar>
				<Container></Container>
			</div>
		</>
	);
}
