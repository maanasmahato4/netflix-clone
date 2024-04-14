import { render, screen } from '@testing-library/react';
import PlayButton from '@/components/playButton'; // Adjust the import path as necessary
import { userEvent } from '@testing-library/user-event';
import mockRouter from 'next-router-mock';

// Correctly mock 'next/router' instead of 'next/navigation'
/* jest.mock('next/navigation', () => ({
	useRouter: () => ({
		push: jest.fn(),
		events: {
			on: jest.fn(),
			off: jest.fn(),
			emit: jest.fn(),
		},
		isFallback: false,
	}),
})); */

jest.mock('next/navigation', () => jest.requireActual('next-router-mock'));

describe('PlayButton', () => {
	it('navigates to the correct URL when clicked', async () => {
		const mockId = '12334444';

		userEvent.setup();
		mockRouter.push('/');
		render(<PlayButton id={mockId} />);
		const button = screen.getByText('Play');
		await userEvent.click(button);

		expect(mockRouter).toMatchObject({
			asPath: `/movie/${mockId}`,
			pathname: `/movie/${mockId}`,
		});
	});
});
