'use client';

import { Movie } from '@/@types/api';
import useBillBoard from '@/hooks/useBillBoard';
import { Button } from './ui/button';
import { InfoIcon } from 'lucide-react';

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
		<div className='relative h-[50vh] bg-white'>
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
						className='h-full w-full object-cover brightness-50 transition duration-500'
					/>
					<div className='absolute top-[20%] ml-[7%] flex w-[70%] flex-col gap-y-4'>
						<h3 className='text-5xl font-bold'>{data.title}</h3>
						<p className='tex-md'>{data.description}</p>
						<div>
							<Button className='flex flex-row items-center gap-x-2 bg-slate-300'>
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
