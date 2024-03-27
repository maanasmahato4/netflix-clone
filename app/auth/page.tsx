'use client';
import { Input } from '@/components/input';
import { ChangeEvent, useState } from 'react';

export default function Auth() {
	const [username, setUserName] = useState<string>('');
	return (
		<section className='min-h-screen bg-[url("/images/hero.jpg")] bg-cover bg-fixed bg-no-repeat'>
			<div className='flex min-h-screen items-center justify-center bg-black lg:bg-opacity-50'>
				<form className='w-[20rem] rounded-lg bg-black p-8 opacity-80'>
					<Input
						id='gu'
						label='name'
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							setUserName(e.target.value)
						}
						value={username}
						type={'text'}
					/>
				</form>
			</div>
		</section>
	);
}
