import axios, { AxiosResponse } from 'axios';

export const fetcher = async (url: string) =>
	axios.get(url).then((res: AxiosResponse) => res.data);
