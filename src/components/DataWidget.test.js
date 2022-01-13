import { render, screen } from '@testing-library/react';
import DataWidget from './DataWidget';

describe("DataWidget", () => {
  it('renders correctly', () => {
    render(<DataWidget label={"test"} value={10} />);
    const text = screen.getByText('test: 10');
    expect(text).toBeInTheDocument();
  });
});
