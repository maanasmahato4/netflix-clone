import useSWR from 'swr';
import axios, { AxiosResponse } from 'axios';

const fetchUserDetails = async (email: string): Promise<AxiosResponse<any>> => {
	const response = await axios.post(
		'/api/users',
		{ email },
		{
			headers: {
				'Content-Type': 'application/json',
			},
		},
	);
	return response.data;
};

export const useFetchUserDetails = (email: string) => {
	const { data, error, isLoading } = useSWR(
		email ? ['fetchUserDetails', email] : null,
		fetchUserDetails,
		{
			revalidateIfStale: false,
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
		},
	);

	return { data, error, isLoading };
};
