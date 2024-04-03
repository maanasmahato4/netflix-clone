import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';
import BillBoard from '@/components/billboard';

async function Home() {
	const session = await getServerSession(authOptions);
	if (!session) {
		redirect('/auth');
	}
	return (
		<div>
			<BillBoard />
		</div>
	);
}

export default Home;
