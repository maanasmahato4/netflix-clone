import { screen, render } from '@testing-library/react';
import { Input } from '@/components/input';

describe('input button test', () => {
	it('should have input value', async () => {
		const mockOnChange = jest.fn();
		render(
			<Input
				id='test-input'
				onChange={mockOnChange}
				value=''
				label='Test Label'
			/>,
		);

		const inputElement = screen.getByLabelText('Test Label');
		expect(inputElement).toBeInTheDocument();
	});
});
