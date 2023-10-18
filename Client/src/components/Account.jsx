import Navbar from './Navbar';

// it's a page
export default function Account() {

    

	return (
		<>
			<div className="flex flex-row">
				<Navbar></Navbar>
				<section>
					<div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
						<div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
							<div className="lg:col-span-1 lg:py-12">
								<div className="max-w-xl text-lg font-bold">Edit Profile</div>
								<p>Keep your profile current to enhance your discoverability</p>
							</div>
							<div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-4 lg:p-12">
								<form action="" className="space-y-4">
									<div className="grid grid-cols-2 gap-4 sm:grdi-cols-2">
										<div>
											<label htmlFor="firstname" className="p-3 ">
												First Name
											</label>
											<input
												className="w-full rounded-lg border-gray-200  focus:outline-gray-200 p-3 text-sm"
												type="text"
												id="firstname"
												placeholder="John"
											/>
										</div>
										<div>
											<label htmlFor="lastname" className="p-3">
												Last Name
											</label>
											<input
												className="w-full rounded-lg border-gray-200 focus:outline-gray-200 p-3 text-sm"
												type="text"
												id="lastname"
												placeholder="Jerry"
											/>
										</div>
									</div>
									<div>
										<label htmlFor="" className="p-3">
											Bio
										</label>
										<textarea
											className="w-full rounded-lg p-3 focus:outline-gray-200"
											placeholder="your bio"
											rows="8"
											id="bio"
										></textarea>
									</div>
									{/* Is student toggle? */}
                                    {/* User image? */}
									<div>
										<button
											type="submit"
											className="inline-block w-full rounded-lg bg-gray-700 hover:bg-gray-500 px-5 py-3 font-medium text-white sm:w-auto"
										>
											Save Profile
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</section>
			</div>
		</>
	);
}
