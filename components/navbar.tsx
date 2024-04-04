'use client';
import Link from 'next/link';
import { Bell, Search, Menu } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import logo from '@/public/images/logo.png';
import Image from 'next/image';
import MobileNavBar from './mobile-nav';
import { useContext, useEffect, useState } from 'react';
import { LayoutContext } from '@/context/layout-context';
import { useSession } from 'next-auth/react';

export default function NavBar() {
	const { data: session } = useSession({ required: true });
	const { mobileMenuHidden, setMobileMenuHidden } = useContext(LayoutContext);
	const [showBackGround, setShowBackGround] = useState<boolean>(false);

	function toggleMobileMenu() {
		setMobileMenuHidden(!mobileMenuHidden);
	}

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY >= 60) {
				setShowBackGround(true);
			} else {
				setShowBackGround(false);
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<header
			className={`sticky top-0 z-10 text-gray-100 transition-colors duration-500 ${showBackGround ? 'bg-black' : 'bg-transparent'}`}
		>
			<nav className='flex w-full items-center justify-between px-16 py-4'>
				<Image src={logo} alt='NETFLIX' className='h-6 w-16' priority />
				<span onClick={toggleMobileMenu} className='lg:hidden'>
					<Menu />
				</span>
				<div className='hidden gap-10 lg:flex'>
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
				<div className='hidden items-center gap-5 lg:flex'>
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
			<MobileNavBar hidden={mobileMenuHidden} />
		</header>
	);
}
