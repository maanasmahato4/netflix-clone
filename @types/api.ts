import { NextApiRequest } from 'next';
import { NextRequest } from 'next/server';

export interface ExtendedNextApiRequest extends NextApiRequest {
	json: () => Promise<UserCreds>;
}

export interface UserCreds {
	username: string;
	email: string;
	password: string;
}
