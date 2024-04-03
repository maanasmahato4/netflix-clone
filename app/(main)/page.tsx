import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';

async function Home() {
	const session = await getServerSession(authOptions);
	if (!session) {
		redirect('/auth');
	}
	return <div>Home</div>;
}

export default Home;
