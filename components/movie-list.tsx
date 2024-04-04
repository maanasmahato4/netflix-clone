'use client';
import { Movie } from '@/@types/api';
import useMovieList from '@/hooks/useMovieList';
import MovieCard from './movie-card';

export default function MoviesList() {
	const {
		data,
		error,
		isLoading,
	}: { data: Movie[]; error: any; isLoading: boolean } = useMovieList();

	if (error) {
		console.log(error);
	}
	return (
		<div>
			{isLoading ? (
				<p>loading...</p>
			) : (
				<div className='flex flex-row flex-wrap items-center justify-center gap-4'>
					{data.map((movie) => {
						return <MovieCard key={movie._id} movie={movie} />;
					})}
				</div>
			)}
		</div>
	);
}
