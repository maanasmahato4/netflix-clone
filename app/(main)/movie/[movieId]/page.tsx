'use client';
import { useParams } from 'next/navigation';
import { FetcherProps } from '@/@types/api';
import useMovie from '@/hooks/useMovie';
import Loader from '@/components/loader';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function Movies() {
	const { data: session } = useSession({ required: true });
	const { movieId } = useParams();
	const { data, error, isLoading }: FetcherProps = useMovie(movieId as string);
	const router = useRouter();

	if (!session?.user) {
		router.push('/auth');
	}

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
