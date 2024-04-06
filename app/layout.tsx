import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import AuthSessionProvider from '@/components/auth-session-provider';
import { LayoutContextProvider } from '@/context/layout-context';
import { Toaster } from 'sonner';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Netflix Clone - Stream Your Favorite Movies and Shows',
	description:
		'Experience a Netflix clone where you can stream your favorite movies and shows. Discover new content and enjoy your favorite series.',
	keywords:
		'Netflix clone, movie streaming, TV shows, streaming service, watch online, Netflix alternative',
	authors: [{ name: 'maanas mahato' }],
	viewport: 'width=device-width, initial-scale=1.0',
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
