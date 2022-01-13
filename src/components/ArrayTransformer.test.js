import { render, fireEvent } from '@testing-library/react';
import ArrayTransformer from './ArrayTransformer';

describe("ArrayTransformer", () => {
  const setOutputArray = jest.fn();
  const setRuntime = jest.fn();

  it('matches snapshot', () => {
    const container = render(<ArrayTransformer inputArray={[]} outputArray={[]} setOutputArray={setOutputArray} setRuntime={setRuntime} />).container;
    expect(container).toMatchSnapshot();
  });

  it('renders the correct number of buttons', () => {
    const { getAllByRole } = render(<ArrayTransformer inputArray={[]} outputArray={[]} setOutputArray={setOutputArray} setRuntime={setRuntime} />);
    const buttons = getAllByRole('button');
    expect(buttons).toHaveLength(5);
  })

  it('adds to changes list when button is clicked', () => {
    const { getAllByRole } = render(<ArrayTransformer inputArray={["1","2","3"]} outputArray={[]} setOutputArray={setOutputArray} setRuntime={setRuntime} />);
    const transformButtons = getAllByRole('button').slice(0,4);
    
    transformButtons.forEach((button) => fireEvent.click(button));

    let listItems = getAllByRole('listitem');
    expect(listItems).toHaveLength(4);
  });

  it('renders correct button text when loading transform', () => {
    const { getAllByRole, getByRole } = render(<ArrayTransformer inputArray={["1","2","3"]} outputArray={[]} setOutputArray={setOutputArray} setRuntime={setRuntime} />);
    const transformButtons = getAllByRole('button').slice(0,4);

    transformButtons.forEach((button) => {
      fireEvent.click(button);
      fireEvent.click(button);
      fireEvent.click(button);
    });

    const applyChangesButton = getByRole('button', {
      name: /Apply changes to array/i
    })
    fireEvent.click(applyChangesButton);

    expect(applyChangesButton).toHaveTextContent('Applying your changes...');
  });
});
