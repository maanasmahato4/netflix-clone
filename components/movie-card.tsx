'use client';
import { Movie } from '@/@types/api';
import { Card } from './ui/card';
import { Play, Heart } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import { Button } from './ui/button';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useFetchUserDetails } from '@/hooks/usefetchUser';

interface MovieCardProps {
	movie: Movie;
}

interface HeartIconProps {
	fill: string;
	color: string;
	saved: boolean;
}

export default function MovieCard({ movie }: MovieCardProps) {
	const { data: session } = useSession({ required: true });

	/* const { data }: { data: any; error: any; isLoading: boolean } =
		useFetchUserDetails(session?.user?.email as string);

	console.log(data); */

	const [heartIconProps, setHeartIconProps] = useState<HeartIconProps>({
		fill: 'none',
		color: 'white',
		saved: false,
	});

	const handleFavorite = useCallback(
		async (id: string) => {
			setHeartIconProps((prev: HeartIconProps) => ({
				...prev,
				fill: prev.fill === 'none' ? 'red' : 'none',
				color: prev.color === 'white' ? 'red' : 'white',
				saved: prev.saved === false ? true : false,
			}));

			if (heartIconProps.saved === true) {
				const response = await axios.post(`/api/favorites/${id}`);
				console.log(response.status);
			} else if (heartIconProps.saved === false) {
				const response = await axios.delete(`/api/favorites/${id}`);
				console.log(response.status);
			}
		},
		[heartIconProps.saved],
	);
	return (
		<Card className='group relative'>
			<Image
				className='relative h-[10rem] w-[20rem] cursor-pointer rounded-md object-cover shadow-xl  transition delay-75 group-hover:opacity-90 group-hover:brightness-50'
				width={300}
				height={300}
				src={movie.thumbnailUrl}
				alt={movie.title}
				draggable={false}
			/>
			<div className='invisible absolute top-0 flex h-full w-full items-center justify-center group-hover:visible group-hover:cursor-pointer'>
				<Button
					variant={'ghost'}
					color='transparent'
					onClick={() => console.log('play')}
				>
					<Play />
				</Button>
			</div>
			<div className=' invisible absolute bottom-1 right-1 flex justify-end p-2 transition-transform delay-75 group-hover:visible'>
				<span
					className='z-40'
					onClick={() => handleFavorite(movie._id as string)}
				>
					<Heart fill={heartIconProps.fill} color={heartIconProps.color} />
				</span>
			</div>
		</Card>
	);
}
