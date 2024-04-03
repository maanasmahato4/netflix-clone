'use client';

import { useContext, useEffect, useState } from 'react';
import NavBar from './navbar';
import { LayoutContext } from '@/context/layout-context';

export default function LayoutWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	const [screenWidth, setScreenWidth] = useState<number>(0);
	const { mobileMenuHidden, setMobileMenuHidden } = useContext(LayoutContext);
	useEffect(() => {
		const handleScreenResize = () => {
			setScreenWidth(window.innerWidth);
		};

		window.addEventListener('resize', handleScreenResize);

		if (screenWidth >= 1024) {
			setMobileMenuHidden(true);
		}

		return () => {
			window.removeEventListener('resize', handleScreenResize);
		};
	}, [screenWidth, setMobileMenuHidden]);
	return (
		<div>
			<NavBar />
			<div
				className={`${mobileMenuHidden ? 'block' : 'hidden'} overflow-hidden`}
			>
				{children}
			</div>
		</div>
	);
}
