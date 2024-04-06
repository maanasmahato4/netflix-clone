'use client';
import { Movie, FetcherProps } from '@/@types/api';
import useMovieList from '@/hooks/useMovieList';
import MovieCard from './movie-card';
import { useState, useEffect } from 'react';
import { useFetchUserDetails } from '@/hooks/usefetchUser';

export default function FavoritesList() {
	const {
		data,
		error,
		isLoading,
	}: { data: Movie[]; error: any; isLoading: boolean } = useMovieList();

	const {
		data: user,
		error: userError,
		isLoading: userIsLoading,
	}: FetcherProps = useFetchUserDetails();

	const [bookMarkedMovies, setBookMarkedMovies] = useState<string[]>([]);
	useEffect(() => {
		if (!userIsLoading && !isLoading && user?.user?.favoriteIds) {
			setBookMarkedMovies(user.user.favoriteIds);
		}
	}, [user, userIsLoading, isLoading]);

	if (error || userError) {
		console.log(error, userError);
		return <div>Error loading movies</div>;
	}
	return (
		<div>
			{isLoading || userIsLoading || !bookMarkedMovies ? (
				<p>loading...</p>
			) : (
				<div className='flex flex-row flex-wrap items-center justify-center gap-4 md:justify-center lg:justify-start lg:gap-2'>
					{data.map((movie) => {
						if (bookMarkedMovies.includes(movie._id as string)) {
							return (
								<MovieCard
									key={movie._id}
									movie={movie}
									bookMarkedMovies={bookMarkedMovies}
								/>
							);
						}
					})}
				</div>
			)}
		</div>
	);
}
