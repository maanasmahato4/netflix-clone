'use client';
import { Input } from '@/components/input';
import { Button } from '@/components/ui/button';
import { ChangeEvent, FormEvent, useState } from 'react';

export default function Auth() {
	const [username, setUserName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [formVariant, setVariant] = useState<string>('login');

	async function handleSubmit(e: FormEvent): Promise<void> {
		e.preventDefault();
		console.log({ username, email, password });
	}

	function toggleFormVariant(): void {
		setVariant((variant) => (variant === 'login' ? 'register' : 'login'));
	}

	return (
		<section className='min-h-screen bg-[url("/images/hero.jpg")] bg-cover bg-fixed bg-no-repeat'>
			<div className='flex min-h-screen items-center justify-center bg-black lg:bg-opacity-50'>
				<form
					className='flex w-[25rem] flex-col gap-y-6 rounded-lg bg-black p-8 opacity-80'
					onSubmit={handleSubmit}
				>
					<h3 className='text-xl'>
						{formVariant === 'login' ? 'SignIn' : 'Register'}
					</h3>
					{formVariant === 'register' ? (
						<Input
							id='username'
							label='Username'
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								setUserName(e.target.value)
							}
							value={username}
							type={'text'}
						/>
					) : null}
					<Input
						id='email'
						label='Email'
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							setEmail(e.target.value)
						}
						value={email}
						type={'text'}
					/>
					<Input
						id='password'
						label='Password'
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							setPassword(e.target.value)
						}
						value={password}
						type={'password'}
					/>
					<div>
						<Button type='submit'>Submit</Button>
					</div>
					<p className='text-neutral-500'>
						{formVariant === 'login'
							? 'First time using NetFlix?'
							: 'Already have an account?'}
						<span
							className='cursor-pointer text-white'
							onClick={toggleFormVariant}
						>
							{formVariant === 'login' ? ' Create an account' : ' Login'}
						</span>
					</p>
				</form>
			</div>
		</section>
	);
}
