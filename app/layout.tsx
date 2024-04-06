import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import AuthSessionProvider from '@/components/auth-session-provider';
import NavBar from '@/components/navbar';
import { LayoutContextProvider } from '@/context/layout-context';
import LayoutWrapper from '@/components/layout-wrapper';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' className='dark'>
			<LayoutContextProvider>
				<body className={inter.className}>
					<AuthSessionProvider>{children}</AuthSessionProvider>
					<Toaster />
				</body>
			</LayoutContextProvider>
		</html>
	);
}
