'use client';
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

export const useFetchUserDetails = async (email: string) => {
	const { data, error, isLoading } = useSWR(fetchUserDetails(email), {
		revalidateIfStale: false,
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
	});

	return {
		data,
		error,
		isLoading,
	};
};
