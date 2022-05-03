import './App.css';
import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {

  constructor() {
    super();
    this.state = {
      Value: '',
      Message1: '',
      Message2: '',
      Message3: '',
      Message4: '',
      Message6: '',
      Message7: '',
      Message8: '',
      Message9: '',
      Message10: '',
      isShow: false,
      isShowCapital: false,
      isShowData: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ Value: event.target.value });
  }
  handleSubmit = async () => {
    try {
      const res = await axios.get(`https://restcountries.com/v3.1/name/{{${this.state.Value}}}`);
      this.setState({ isShow: true });
      if(res)
      if(res['status'] === 200){
        this.setState({ isShowData: true });
        this.setState({ Message1: res.data[0].capital });
        this.setState({ Message2: res.data[0].population });
        this.setState({ Message3: res.data[0].latlng[0] + " " + res.data[0].latlng[1]});
        this.setState({ Message4: res.data[0].flag });      
      }
      //console.log(res)
    } catch (err){
      this.setState({ isShow: true });
      this.setState({ Message6: "Please provide a valid Country Name" });
      console.log(err);
    }
  }
  handleSubmitCapital = async () => {
    try {
      //console.log('hi')
      const res1 = await axios.get(`http://api.weatherstack.com/current?access_key=aeb6065506c53f048c81581e17caeed9&query={{${this.state.Message1}}}`)
      this.setState({ isShowCapital: true })
      if(res1)
      if(res1['status'] === 200){
        this.setState({ Message7: res1.data.current.temperature });
        this.setState({ Message8: res1.data.current.weather_icons });
        this.setState({ Message9: res1.data.current.wind_speed });
        this.setState({ Message10: res1.data.current.precip });
      }
    } catch (err) {
      console.log(err);
    }
  }
  render() {
    return (
      <div className='App A'>
        {
          !this.state.isShowData ? (
            <>
                <div >
                  <label htmlFor = 'countryName'>Enter Country Name</label><br/><br/>
                    <input  id="countryName" autoFocus="autoFocus" placeholder="Country Name" value={this.state.Value} onChange={this.handleChange} />
                    <br/><br/>
                    <button type = "submit" onClick={this.handleSubmit} disabled={!this.state.Value} >Submit</button>
                </div>
            </>
          ) : null
        }
        {
          this.state.isShow && !this.state.isShowCapital ? (
            this.state.isShowData ? (
              <div className = 'App A2'>
                  <table>
                        <thead>
                          <tr>
                              <th>Capital</th>
                              <th>Population</th>
                              <th>Lonlang</th>
                              <th>Flag</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                              <td><button onClick={this.handleSubmitCapital} type = "submit" value={this.state.Message1}>{this.state.Message1} </button></td>
                              <td>{this.state.Message2}</td>
                              <td>{this.state.Message3}</td>
                              <td>{this.state.Message4}</td>
                          </tr>
                        </tbody>
                    </table>
              </div>
            ) : (
              <div>
                <h1>{this.state.Message6}</h1>
              </div>
            )
          ) : null
        }
        {
          this.state.isShowCapital === true ? (
            <div className = 'App A2'>
                <table>
                    <thead>
                      <tr>
                          <th>Temperature</th>
                          <th>Weather</th>
                          <th>WindSpeed</th>
                          <th>Precipitation</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{this.state.Message7} C</td>
                        <td><img src={this.state.Message8} alt="Country"></img></td>
                        <td>{this.state.Message9}</td>
                        <td>{this.state.Message10}</td>
                      </tr>
                    </tbody>
                </table>
            </div>
          ) : null
        }
      </div>
    )
  }
}

export default App;