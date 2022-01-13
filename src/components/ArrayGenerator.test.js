import { fireEvent, render, screen } from '@testing-library/react';
import ArrayGenerator from './ArrayGenerator';

describe("ArrayGenerator", () => {
  const setArray = jest.fn();

  it('renders text if array is empty', () => {
    render(<ArrayGenerator length={0} setArray={setArray} />);
    const text = screen.getByText('Array not generated');
    expect(text).toBeInTheDocument();
  });

  it('does not fire the setArray if input is empty', () => {
    render(<ArrayGenerator length={1} setArray={setArray} />);
    const input = screen.getByRole("spinbutton");
    expect(input).toHaveValue(null);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(setArray).toHaveBeenCalledTimes(0);
  });

  it('fires setArray if input exists', () => {
    render(<ArrayGenerator length={1} setArray={setArray} />);
    const input = screen.getByRole("spinbutton");
    expect(input).toHaveValue(null);

    fireEvent.change(input, {target: {value: '2000'}});
    expect(input).toHaveValue(2000);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    
    expect(setArray).toHaveBeenCalledTimes(1);
  });
});
