'use client';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeftIcon } from 'lucide-react';
import { FetcherProps } from '@/@types/api';
import useMovie from '@/hooks/useMovie';

export default function Movies() {
	const { movieId } = useParams();
	const router = useRouter();
	const { data, error, isLoading }: FetcherProps = useMovie(movieId as string);

	if (error) {
		console.error(error);
		return <div>error</div>;
	}
	if (isLoading) {
		return <div>isLoading</div>;
	}
	return (
		<div className='h-screen w-screen bg-black'>
			<nav className='fixed z-10 flex w-full flex-row items-center gap-8 bg-black bg-opacity-70 p-4'>
				<ArrowLeftIcon
					onClick={() => router.push('/')}
					className='w-4 cursor-pointer text-white transition hover:opacity-80 md:w-10'
				/>
				<p className='text-1xl font-bold text-white md:text-3xl'>
					<span className='font-light'>Watching:</span> {data?.title}
				</p>
			</nav>
			<video
				className='h-full w-full'
				autoPlay
				controls
				src={data?.videoUrl}
			></video>
		</div>
	);
}
