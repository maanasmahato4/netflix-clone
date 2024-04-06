import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { Play } from 'lucide-react';

interface PlayButtonProps {
	id: string;
}

export default function PlayButton({ id }: PlayButtonProps) {
	const router = useRouter();
	return (
		<Button
			size={'sm'}
			className='bg-slate-300'
			onClick={() => router.push(`/movie/${id}`)}
		>
			<Play /> Play
		</Button>
	);
}
