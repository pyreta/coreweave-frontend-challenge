import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe("Button", () => {
  const onClick = jest.fn();
  it('renders button correctly', () => {
    render(<Button text={"Test Button"} onClick={onClick} />);
    const button = screen.getByText('Test Button');
    expect(button).toBeInTheDocument();
  });

  it('fires on click correctly', () => {
    render(<Button text={"Test Button"} onClick={onClick} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('enables button by default', () => {
    render(<Button text={"Test Button"} onClick={onClick} />);
    const button = screen.getByRole('button');
    expect(button).not.toBeDisabled();
  });

  it('disables button correctly', () => {
    render(<Button text={"Test Button"} onClick={onClick} disabled={true} />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });
});
