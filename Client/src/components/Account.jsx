import EditProfile from './EditProfile';
import Navbar from './Navbar';

// it's a page
export default function Account() {
	return (
		<>
			<div className="flex flex-row">
				<Navbar></Navbar>
				<div className="">
					<EditProfile></EditProfile>
				</div>
			</div>
		</>
	);
}
