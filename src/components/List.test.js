import { render, screen } from '@testing-library/react';
import List from './List';

describe("List", () => {
  it('renders the list items', () => {
    const { getAllByRole } = render(<List listItems={[1,2,3,4,5]} />);
    const items = getAllByRole("listitem");
    expect(items.length).toEqual(5);
  });

  it('renders text for empty list', () => {
    render(<List listItems={[]} />);
    const emptyText = screen.getByText('No filters selected');
    expect(emptyText).toBeInTheDocument();
  });
});

