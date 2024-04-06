'use client';

import { Movie } from '@/@types/api';
import useBillBoard from '@/hooks/useBillBoard';
import { Button } from './ui/button';
import { InfoIcon } from 'lucide-react';
import PlayButton from './playButton';

export default function BillBoard() {
	const {
		data,
		error,
		isLoading,
	}: { data: Movie; error: any; isLoading: any } = useBillBoard();

	if (error) {
		console.error(error);
	}
	return (
		<div className='relative h-[56.25vw]'>
			{isLoading ? (
				<p color='black'>loading...</p>
			) : (
				<div>
					<video
						poster={data.thumbnailUrl}
						autoPlay
						muted
						loop
						src={data.videoUrl}
						className='h-[56.25vw] w-full object-cover brightness-50 transition duration-500'
					/>
					<div className='absolute top-[10%] ml-[7%] flex w-[70%] flex-col gap-y-4 md:top-[30%]'>
						<h3 className='text-xl font-bold md:text-3xl lg:text-5xl'>
							{data.title}
						</h3>
						<p className='text-xs md:text-sm'>{data.description}</p>
						<div className='flex flex-row gap-4'>
							<PlayButton id={data._id as string} />
							<Button
								size={'sm'}
								className='flex flex-row items-center gap-x-2 bg-slate-300'
							>
								<InfoIcon />
								More Info
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
