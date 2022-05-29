import { render, screen, cleanup } from '@testing-library/react';
import ResultBox from './ResultBox';
import '@testing-library/jest-dom/extend-expect';
import { convertPLNToUSD } from './../../utils/convertPLNToUSD';
import { convertUSDToPLN } from './../../utils/convertUSDToPLN';
import { formatAmountInCurrency } from './../../utils/formatAmountInCurrency';

describe('Component ResultBox', () => {});
it('should render without crashing', () => {
  render(<ResultBox from='PLN' to='USD' amount={100} />);
});
it('should render proper info about conversion when PLN -> USD', () => {
  // prepare test cases
  const testCasesPLN = ['100', '345', '200', '67'];

  for (const testObj of testCasesPLN) {
    // render component with params
    render(<ResultBox from='PLN' to='USD' amount={parseInt(testObj)} />);

    // find component output
    const output = screen.getByTestId('output');

    // check if output in PLN = output in USD
    expect(output).toHaveTextContent(
      `${formatAmountInCurrency(testObj, 'PLN')} = ${convertPLNToUSD(
        parseInt(testObj)
      )}`
    );
    cleanup();
  }
});
it('should render proper info about conversion when USD -> PLN', () => {
  // prepare test cases
  const testCasesUSD = ['89', '128', '354', '67'];

  for (const testObj of testCasesUSD) {
    // render component with params
    render(<ResultBox from='USD' to='PLN' amount={parseInt(testObj)} />);

    // find component output
    const output = screen.getByTestId('output');

    // check if output in USD = output in PLN
    expect(output).toHaveTextContent(
      `${formatAmountInCurrency(testObj, 'USD')} = ${convertUSDToPLN(
        parseInt(testObj)
      )}`
    );
    cleanup();
  }
});
it('should render proper info about conversion when PLN -> PLN', () => {
  // prepare test cases
  const testCasesSameFromToPLN = ['152', '18', '4', '1253'];

  for (const testObj of testCasesSameFromToPLN) {
    // render component with params
    render(<ResultBox from='PLN' to='PLN' amount={parseInt(testObj)} />);

    // find component output
    const output = screen.getByTestId('output');

    // check if output is PLN = PLN
    expect(output).toHaveTextContent(
      `${formatAmountInCurrency(testObj, 'PLN')} = ${formatAmountInCurrency(
        testObj,
        'PLN'
      )}`
    );
    cleanup();
  }
});
it('should render proper info about conversion when USD -> USD', () => {
  // prepare test cases
  const testCasesSameFromToUSD = ['854', '645', '348', '753'];

  for (const testObj of testCasesSameFromToUSD) {
    // render component with params
    render(<ResultBox from='USD' to='USD' amount={parseInt(testObj)} />);

    // find component output
    const output = screen.getByTestId('output');

    // check if output is USD = USD
    expect(output).toHaveTextContent(
      `${formatAmountInCurrency(testObj, 'USD')} = ${formatAmountInCurrency(
        testObj,
        'USD'
      )}`
    );
    cleanup();
  }
});
