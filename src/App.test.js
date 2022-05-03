import { render, screen, cleanup,fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'
import Enzyme, { shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
const axios = require('axios');

jest.mock('axios');
import App from './App';

describe('Test for input feild', () =>{
  it('Test for input value is null at page reload',() => {
    render(<App />)
    const input = screen.getByLabelText('Enter Country Name')
    expect(input).toHaveValue('');
  });
  it('Test for button is disable',() => {
    render(<App />)
    const button = screen.getByRole('button',{description: 'Submit'})
    expect(button).toBeDisabled();
  });
  it('Test for input value is provided',() => {
    render(<App />)
    const input = screen.getByLabelText('Enter Country Name')
    fireEvent.change(input, {target: {value: 'Hello'}})
    expect(input).toHaveValue('Hello');
  });
  it('Test for button is enabled',() => {
    render(<App />)
    const input = screen.getByLabelText('Enter Country Name')
    fireEvent.change(input, {target: {value: 'Hello'}})
    const button = screen.getByRole('button',{description: 'Submit'})
    expect(button).toBeEnabled();
  });
  it('Test for input value is provided',() => {
    render(<App />)
    const input = screen.getByLabelText('Enter Country Name')
    fireEvent.change(input, {target: {value: 'Hello'}})
    const button = screen.getByRole('button',{description: 'Submit'})
    fireEvent.click(button)
  });
})

describe('Test for API call',() => {
  it('Check API is true', async () => {
    await axios.get.mockResolvedValue({
      data:[
        {
          capital :["New Delhi"],
          population: 1380004385,
          latlng:  [20, 77],
          flag: "🇮🇳"
        }
      ]
      
    });
    render(<App />)
    const input = screen.getByLabelText('Enter Country Name')
    fireEvent.change(input, {target: {value: 'India'}})
    const button = screen.getByRole('button',{description: 'Submit'})
    fireEvent.click(button)
    const response = fireEvent.click(button)
    await ()=>{

    }
    const rsp = screen.getByTestId('country')
    // // expect(response).toBe(true);
    // const tmp = screen.getByTestId('country')
    // expect(response).toBeVisible
    // const title = await handleSubmit();
    // expect(title).toEqual('My First Album');
    console.log(rsp)
  });
})



