import { Link} from 'react-router-dom';

export default function Navbar() {

	return (
		<>
			<div className="flex flex-col justify-between h-screen">
				<div className="px-4 py-6">
					<span className="grid h-10 w-32 font-bold place-content-center rounded-lg bg-white-100 text-2xl text-gray-600">
						Worksy
					</span>

					<ul className="mt-6 space-y-1">
						<li>
							<Link
								to="/"
								className="block rounded-lg px-4 py-2 text-lg font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
							>
								Home
							</Link>
						</li>
						<li>
							<Link
								to="/collections"
								className="block rounded-lg px-4 py-2 text-lg font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
							>
								Collections
							</Link>
						</li>
						<li>
							<Link
								to={'/services'}
								className="block rounded-lg px-4 py-2 text-lg font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
							>
								Your posts
							</Link>
						</li>

						<li>
							<details className="group [&_summary::-webkit-details-marker]:hidden">
								<summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
									<span className="text-lg font-medium">Account</span>

									<span className="shrink-0 transition duration-300 group-open:-rotate-180">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-5 w-5"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path
												fillRule="evenodd"
												d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
												clipRule="evenodd"
											/>
										</svg>
									</span>
								</summary>
								<ul className="mt-2 space-y-1 px-4">
									<li>
										<Link
											to={`/account`}
											className="block rounded-lg px-4 py-2 text-lg font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
										>
											Details
										</Link>
									</li>
									<li>
										<Link
											to="/logout"
											className="block rounded-lg px-4 py-2 text-lg font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
										>
											Logout
										</Link>
									</li>
								</ul>
							</details>
						</li>
					</ul>
				</div>

				<div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
					<div className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
						<img
							src="https://images.unsplash.com/photo-1696339596874-effbe56ae8b0?auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=2574"
							className="h-10 w-10 roudned-full object-cover"
						></img>
						<div>
							<p className="text-xs">
								<strong className="block font-medium">John Jerry</strong>
								<span> john@myumanitoba.ca</span>
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
