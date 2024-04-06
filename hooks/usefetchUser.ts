import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';

export const useFetchUserDetails = () => {
	const { data, error, isLoading } = useSWR('/api/users', fetcher, {
		revalidateIfStale: false,
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
	});

	return { data, error, isLoading };
};
