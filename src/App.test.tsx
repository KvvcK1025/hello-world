import { render, screen, waitFor, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom'
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
    const button = screen.getByRole('button',{name: 'Submit'})
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
    const button = screen.getByRole('button',{name: 'Submit'})
    expect(button).toBeEnabled();
  });
  it('Test for input value is provided',() => {
    render(<App />)
    const input = screen.getByLabelText('Enter Country Name')
    fireEvent.change(input, {target: {value: 'Hello'}})
    const button = screen.getByRole('button',{name: 'Submit'})
    fireEvent.click(button)
  });
})

describe('Test for API call',() => {
  it('Check API call with valid', async () => {
    await axios.get.mockResolvedValue({
      status: 200,
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
    const button = screen.getByRole('button',{name: 'Submit'})
    await fireEvent.click(button)
    const table = await screen.findByRole('table')
    expect(table).toBeVisible
  });

  it('Check API with out valid data', async () => {
    await axios.get.mockRejectedValue({
      status: 404,
      data:[
        {
          status: 404,
          message: "Not Found"
        }
      ]
    });
    render(<App />)
    const input = screen.getByLabelText('Enter Country Name')
    fireEvent.change(input, {target: {value: 'India'}})
    const button = screen.getByRole('button',{name: 'Submit'})
    await fireEvent.click(button)
    const heading = await screen.findByRole('heading')
    expect(heading).toBeVisible
  });

  it('Check API have button', async () => {
    await axios.get.mockResolvedValue({
      status: 200,
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
    const button = screen.getByRole('button',{name: 'Submit'})
    await fireEvent.click(button)
    const capitalButton = await screen.findByRole('button',{name: 'New Delhi'})
    expect(capitalButton).toBeVisible
  });
  
  it('Check API have for capital', async () => {
    axios.get
      .mockImplementationOnce(() => Promise.resolve({
        status: 200,
        data:[
          {
            capital :["New Delhi"],
            population: 1380004385,
            latlng:  [20, 77],
            flag: "🇮🇳"
          }
        ]
      }))
      .mockImplementationOnce(() => Promise.resolve({
          status: 200,
          data: {
            current:{
              temperature: 37,
              weather_icons: "https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0004_black_low_cloud.png",
              wind_speed:	7,
              Precip:0
            }
          }
      }))
    render(<App />)
    const input = screen.getByLabelText('Enter Country Name')
    fireEvent.change(input, {target: {value: 'India'}})
    const button = screen.getByRole('button',{name: 'Submit'})
    fireEvent.click(button)
    const capitalButton = await waitFor(() => {
      return screen.findByRole('button',{name: 'New Delhi'}) 
    });
    fireEvent.click(capitalButton)
    const tabledata = screen.findByText("Weather")
    expect(tabledata).toBeVisible
  });
})