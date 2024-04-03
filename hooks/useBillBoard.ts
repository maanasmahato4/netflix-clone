import { fetcher } from '@/lib/fetcher';
import useSWR from 'swr';

export default function useBillBoard() {
	const { data, error, isLoading } = useSWR('/api/random-movie', fetcher, {
		revalidateIfStale: false,
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
	});

	return {
		data,
		error,
		isLoading,
	};
}
