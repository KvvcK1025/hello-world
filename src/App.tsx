import './App.css';
import React, { Component } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


interface MyProps {}

interface MyState {
  countryName: string,
  Message1: string,
  Message2: string,
  Message3: string,
  Message4: string,
  Message6: string,
  Message7: string,
  Message8: string,
  Message9: string,
  Message10: string,
  isShow: boolean,
  isShowCapital: boolean,
  isShowData: boolean,
}

class App extends Component<MyProps, MyState>{

  constructor(props:MyProps) {
    super(props);
    this.state = {
      countryName: "",
      Message1: "",
      Message2: "",
      Message3: "",
      Message4: "",
      Message6: "",
      Message7: "",
      Message8: "",
      Message9: "",
      Message10: "",
      isShow: false,
      isShowCapital: false,
      isShowData: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event:React.FormEvent<HTMLInputElement>) {
    this.setState({ countryName: event.currentTarget.value });
  }
  handleSubmit = async () => {
    try {
      const res = await axios.get(`https://restcountries.com/v3.1/name/{{${this.state.countryName}}}`);
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
      this.setState({ Message6: "please provide a valid Country Name" });
      //console.log(err);
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
                  <input value={this.state.countryName} id="countryName" autoFocus placeholder="Country Name"  onChange={this.handleChange} />
                    <br/><br/>
                    <Button variant="contained"type = "submit"  onClick={this.handleSubmit} disabled={!this.state.countryName}>Submit</Button>
                </div>
            </>
          ) : null
        }
        {
          this.state.isShow && !this.state.isShowCapital ? (
            this.state.isShowData ? (
              <div >
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 50 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align='center'>Capital(City)</StyledTableCell>
                         <StyledTableCell align='center'>Population(Number)</StyledTableCell>
                         <StyledTableCell align='center'>Lonlang</StyledTableCell>
                         <StyledTableCell align='center'>Flag</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                        <StyledTableRow>
                           <StyledTableCell align='center'><Button variant="contained"onClick={this.handleSubmitCapital} type = "submit" name={this.state.Message1} >{this.state.Message1} </Button></StyledTableCell>
                           <StyledTableCell align='center'>{this.state.Message2}</StyledTableCell>
                           <StyledTableCell align='center'>{this.state.Message3}</StyledTableCell>
                           <StyledTableCell align='center'>{this.state.Message4}</StyledTableCell>
                        </StyledTableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
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
            <div >
              <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 50 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                         <StyledTableCell align='center'>Temperature(<sup>o</sup>C)</StyledTableCell>
                         <StyledTableCell align='center'>Weather(Img)</StyledTableCell>
                         <StyledTableCell align='center'>WindSpeed</StyledTableCell>
                         <StyledTableCell align='center'>Precipitation</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                        <StyledTableRow>
                           <StyledTableCell align='center'>{this.state.Message7}</StyledTableCell>
                           <StyledTableCell align='center'><img src={this.state.Message8} alt="Country"/></StyledTableCell>
                           <StyledTableCell align='center'>{this.state.Message9}</StyledTableCell>
                           <StyledTableCell align='center'>{this.state.Message10}</StyledTableCell>
                        </StyledTableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
            </div>
          ) : null
        }
      </div>
    )
  }
}

export default App;