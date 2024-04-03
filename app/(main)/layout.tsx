import LayoutWrapper from '@/components/layout-wrapper';
import React from 'react';

export default function MainLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<LayoutWrapper>{children}</LayoutWrapper>
		</>
	);
}
