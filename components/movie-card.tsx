'use client';

import { Movie } from '@/@types/api';
import { Card } from './ui/card';
import { Play, Heart } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { Button } from './ui/button';

interface MovieCardProps {
	movie: Movie;
}

interface HeartIconProps {
	fill: string;
	color: string;
}

export default function MovieCard({ movie }: MovieCardProps) {
	const [heartIconProps, setHeartIconProps] = useState<HeartIconProps>({
		fill: 'none',
		color: 'white',
	});

	const handleFavorite = () => {
		setHeartIconProps((prev: HeartIconProps) => ({
			...prev,
			fill: prev.fill === 'none' ? 'red' : 'none',
			color: prev.color === 'white' ? 'red' : 'white',
		}));
	};
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
				<span className='z-40' onClick={handleFavorite}>
					<Heart fill={heartIconProps.fill} color={heartIconProps.color} />
				</span>
			</div>
		</Card>
	);
}
