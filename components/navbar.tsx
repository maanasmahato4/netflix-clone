import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { Bell, Search } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import logo from '@/public/images/logo.png';
import Image from 'next/image';
export default async function NavBar() {
	const session = await getServerSession(authOptions);
	return (
		<header className=' text-gray-100'>
			<nav className='flex w-full items-center justify-between px-10 py-4'>
				<Image src={logo} alt='NETFLIX' className='h-6 w-16' />
				<div className='flex gap-10'>
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
				</div>
				<div className='flex items-center gap-5'>
					<span className='cursor-pointer'>
						<Search />
					</span>
					<span className='cursor-pointer'>
						<Bell />
					</span>
					{session ? (
						<DropdownMenu>
							<DropdownMenuTrigger>
								<Avatar>
									<AvatarImage src={session.user?.image as string} />
									<AvatarFallback>
										{session.user?.name?.substring(0, 2).toUpperCase()}
									</AvatarFallback>
								</Avatar>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuItem>
									<Link href='/profile'>Profile</Link>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Link href='/api/auth/signout?callbackUrl=/'>Log Out</Link>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					) : (
						<Link href='/api/auth/signin'>Sign In</Link>
					)}
				</div>
			</nav>
		</header>
	);
}
