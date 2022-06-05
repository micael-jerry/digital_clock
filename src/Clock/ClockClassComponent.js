import React from "react";
import "./Clock.css";

export class ClockClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        date: new Date(),
        timer: null ,
        enterValue : false,
        hours : 0,
        minute : 0,
        second : 0,
        timestamp : new Date().getTime()
    };
    this.changeInput = this.changeInput.bind(this);
    this.inputHours = this.inputHours.bind(this);
    this.inputMinute = this.inputMinute.bind(this);
    this.inputSecond = this.inputSecond.bind(this);
    this.start = this.start.bind(this);
    this.restart = this.restart.bind(this);
  }

  componentDidMount() {
    this.setState({
      timer: setInterval(() => this.setState(state => ({
        date : new Date(state.timestamp),
        timestamp : state.timestamp+1000
      })), 1000),
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  padStartDigit(digit) {
    return digit.toString().padStart(2, "0");
  }

  changeInput(){
    this.setState(state => ({
      enterValue : !state.enterValue
    }))
  }

  inputHours(event){
    this.setState({
      hours : event.target.value
    });
  }
  inputMinute(event){
    this.setState({
      minute : event.target.value
    });
  }
  inputSecond(event){
    this.setState({
      second : event.target.value
    });
  }
  
  start(){
    this.setState(state => ({
      timestamp : new Date(new Date().getYear(),new Date().getMonth(),new Date().getDay(),state.hours,state.minute,state.second).getTime()
    }));
    this.changeInput()
  }

  restart(){
    this.setState(state => ({
      timestamp : new Date().getTime()
    }));
  }

  render() {
    if(this.state.enterValue===false){
      return (
        <div className="clock">
          <div className="value">
            <span>{this.padStartDigit(this.state.date.getHours())}: </span>
            <span>{this.padStartDigit(this.state.date.getMinutes())}: </span>
            <span>{this.padStartDigit(this.state.date.getSeconds())}</span>
          </div>
          <div className="divButton">
            <button className="button" onClick={this.changeInput} >INPUT</button>
            <button className="button" onClick={this.restart}>RESTART</button>
          </div>
        </div>
      );
    } else{
      return (
        <div >
          <div className="clock">
            <div className="value">
              <input className="input" type="text" id="inputHours"  onChange={this.inputHours}/>
              <input className="input" type="text" id="inputMinute" onChange={this.inputMinute}/>
              <input className="input" type="text" id="inputSecond" onChange={this.inputSecond}/>
            </div>
            <div className="divButton">
              <button className="button" onClick={this.start} >START</button>
              <button className="button" onClick={this.restart} >RESTART</button>
          </div>
          </div>
        </div>
      )
    }
  }
}