import { NextApiRequest } from 'next';
import { NextRequest } from 'next/server';

export interface ExtendedNextApiRequest<T = any> extends NextApiRequest {
	json: () => Promise<T>;
}

export interface UserCreds {
	username: string;
	email: string;
	password: string;
}

export interface SessionUser {
	name: string;
	email: string;
	image: string;
}

export interface Movie {
	_id?: string;
	title: string;
	description: string;
	duration: string;
	genre: string;
	thumbnailUrl: string;
	videoUrl: string;
}

export interface User {
	_id?: string;
	name: string;
	image: string;
	email: string;
	emailVerified: Date;
	hashedPassword: string;
	session: string[];
	accounts: string[];
	favoriteIds: string[];
}

export interface FetcherProps {
	data: any;
	error: any;
	isLoading: boolean;
}
