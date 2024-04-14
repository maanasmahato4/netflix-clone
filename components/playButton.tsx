import { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { Play } from 'lucide-react';

export interface PlayButtonProps {
	id: string;
}

const PlayButton: NextPage<PlayButtonProps> = ({ id }) => {
	const router = useRouter();

	return (
		<Button
			size={'sm'}
			className='bg-slate-300'
			onClick={() => router.push(`/movie/${id}`)}
		>
			<Play />
			Play
		</Button>
	);
};

export default PlayButton;
