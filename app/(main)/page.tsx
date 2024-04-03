import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';

async function Home() {
	const session = await getServerSession(authOptions);
	if (!session) {
		redirect('/auth');
	}
	return (
		<div>
			<div className='h-screen'>hs</div>
			<div className='h-screen'>hs</div>
		</div>
	);
}

export default Home;
