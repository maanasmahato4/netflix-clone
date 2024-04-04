import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';
import BillBoard from '@/components/billboard';
import MoviesList from '@/components/movie-list';

async function Home() {
	const session = await getServerSession(authOptions);
	if (!session) {
		redirect('/auth');
	}
	return (
		<div>
			<div className='my-2'>
				<BillBoard />
			</div>

			<div className='my-4 mb-8 px-4'>
				<h3 className='mb-8 text-2xl font-bold'>Trending Now</h3>
				<MoviesList />
			</div>
		</div>
	);
}

export default Home;
