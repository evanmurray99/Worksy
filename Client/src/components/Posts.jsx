import CreatePost from './CreatePost';
import Post from './Post';
import Navbar from './Navbar';

export default function Posts() {
	return (
		<>
			<div className="flex flex-row">
				<Navbar></Navbar>
				<div className="mx-auto px-4 py-16 sm:px-6 lg:px-8 bg-gray-100 w-full">
					<div className="lg:col-span-1 lg:py-12">
						<div className="max-w-xl text-lg font-bold">Edit your posts</div>
						<p>Keep your post current to enhance your discoverability</p>
					</div>
					<div className="grid grid-cols-1 gap-x-4 gap-y-8 lg:grid-cols-3">
						<CreatePost />
						<Post />
						<Post />
					</div>
				</div>
			</div>
		</>
	);
}
