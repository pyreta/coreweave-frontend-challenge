import { render, screen } from '@testing-library/react';
import App from './App';

describe("App", () => {
  it('renders', () => {
    render(<App />);
    const linkElement = screen.getByText('The Pointless App');
    expect(linkElement).toBeInTheDocument();
  });

  it('match snapshot', () => {
    expect(render(<App />).container).toMatchSnapshot();
  });
});

