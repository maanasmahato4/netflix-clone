'use client';
import { useParams } from 'next/navigation';
import { FetcherProps } from '@/@types/api';
import useMovie from '@/hooks/useMovie';
import Loader from '@/components/loader';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function Movies() {
	const { movieId } = useParams();
	const { data, error, isLoading }: FetcherProps = useMovie(movieId as string);
	const router = useRouter();

	if (error) {
		console.error(error);
		router.push('/');
		return toast(`error: ${error.message}`);
	}
	if (isLoading) {
		return <Loader />;
	}
	return (
		<div className='flex h-[80vh] flex-col bg-black'>
			<div className='h-[100%] w-full'>
				<video
					className='h-full w-full object-cover'
					autoPlay
					controls
					src={data?.videoUrl}
				></video>
			</div>
		</div>
	);
}
