import Link from 'next/link';

interface MobileNavProps {
	hidden: boolean;
}

const MobileNavBar: React.FC<MobileNavProps> = ({ hidden }) => {
	return (
		<div
			className={`${hidden ? 'hidden' : 'flex'} h-full flex-col gap-5 px-8 text-center`}
		>
			<Link className='nav-link' href='/'>
				Home
			</Link>
			<Link className='nav-link' href='/series'>
				Series
			</Link>
			<Link className='nav-link' href='/films'>
				Films
			</Link>
			<Link className='nav-link' href='/new&popular'>
				New & Popular
			</Link>
			<Link className='nav-link' href='/mylist'>
				My List
			</Link>
			<Link className='nav-link' href='/languages'>
				Browse by languages
			</Link>

			<div className='py-4 pb-2'>
				<h3 className='text-start text-lg'>Account</h3>
				<div className='flex flex-col gap-5'>
					<Link className='nav-link' href='/profile'>
						Profile
					</Link>
					<Link className='nav-link' href='/api/auth/signout?callbackUrl=/'>
						Log Out
					</Link>
				</div>
			</div>
		</div>
	);
};

export default MobileNavBar;
