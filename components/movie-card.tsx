'use client';
import { Movie } from '@/@types/api';
import { Card } from './ui/card';
import { Play, Heart } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import axios from 'axios';
import PlayButton from './playButton';
import { toast } from 'sonner';
interface MovieCardProps {
	movie: Movie;
	bookMarkedMovies: string[];
}

interface HeartIconProps {
	fill: string;
	color: string;
	saved: boolean;
}

const MovieCard = ({ movie, bookMarkedMovies }: MovieCardProps) => {
	const [heartIconProps, setHeartIconProps] = useState<HeartIconProps>({
		fill: 'none',
		color: 'white',
		saved: false,
	});

	useEffect(() => {
		if (bookMarkedMovies.includes(movie._id as string)) {
			setHeartIconProps({ fill: 'red', color: 'red', saved: true });
		} else {
			setHeartIconProps({ fill: 'none', color: 'white', saved: false });
		}
	}, [bookMarkedMovies, movie._id]);

	const handleFavorite = async (id: string) => {
		setHeartIconProps((prev: HeartIconProps) => {
			return {
				...prev,
				fill: prev.fill === 'none' ? 'red' : 'none',
				color: prev.color === 'white' ? 'red' : 'white',
				saved: !prev.saved,
			};
		});

		try {
			if (!heartIconProps.saved) {
				toast('Movie added to bookmarks!');
				await axios.post(`/api/favorites/${id}`);
			} else {
				toast('Movie removed from bookmarks!');
				await axios.delete(`/api/favorites/${id}`);
			}
		} catch (error) {
			console.error(error);
		}
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
				priority
			/>
			<div className='invisible absolute top-0 flex h-full w-full items-center justify-center group-hover:visible group-hover:cursor-pointer'>
				<PlayButton id={movie._id as string} />
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
};

export default MovieCard;
