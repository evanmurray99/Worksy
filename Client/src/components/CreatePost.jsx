export default function CreatePost() {
	return (
		<>
			<div className="h-80 w-80 rounded-lg bg-gray-200">
				<div className="flex flex-col text-center items-center border-dashed border-black">
					<p className="font-bold text-xl mt-4 py-12">Upload your post</p>
					<p className="px-5 py-1">
						Ready to show your best work? Share it and be part of a community
					</p>
					<button
						className="inline-block bg-gray-700 hover:bg-gray-500 rounded-full px-6 py-3 text-sm font-semibold text-gray-200 mt-10"
						onClick={() => {}}
					>
						Upload
					</button>
				</div>
			</div>
		</>
	);
}
