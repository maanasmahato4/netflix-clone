'use client';

import { useContext } from 'react';
import NavBar from './navbar';
import { LayoutContext } from '@/context/layout-context';

export default function LayoutWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	const { mobileMenuHidden } = useContext(LayoutContext);
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
