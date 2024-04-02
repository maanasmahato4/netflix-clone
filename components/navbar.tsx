import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import Link from 'next/link';

export default async function NavBar() {
	const session = await getServerSession(authOptions);
	return (
		<header className='bg-gray-600 text-gray-100'>
			<nav className='flex w-full items-center justify-between px-10 py-4'>
				<div>My Site</div>
				<div className='flex gap-10'>
					<Link href='/'>Home</Link>
				</div>
				{session ? (
					<Link href='/api/auth/signout?callbackUrl=/'>Log Out</Link>
				) : (
					<Link href='/api/auth/signin'>Sign In</Link>
				)}
			</nav>
		</header>
	);
}
