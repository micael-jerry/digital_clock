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
        second : 0
    };
    this.changeInput = this.changeInput.bind(this)
    this.inputHours = this.inputHours.bind(this)
    this.inputMinute = this.inputMinute.bind(this)
    this.inputSecond = this.inputSecond.bind(this)
    this.start = this.start.bind(this)
  }

  componentDidMount() {
    this.setState({
      timer: setInterval(() => this.setState({ date: new Date() }), 1000),
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
      date : new Date(state.date.getYear(),state.date.getMonth(),state.date.getDay(),state.hours,state.minute,state.second)
    }));
    this.changeInput()
  }

  render() {
    if(this.state.enterValue===false){
      return (
        <>
          <div className="clock">
            <span>{this.padStartDigit(this.state.date.getHours())}: </span>
            <span>{this.padStartDigit(this.state.date.getMinutes())}: </span>
            <span>{this.padStartDigit(this.state.date.getSeconds())}</span>
            <button onClick={this.changeInput} >INPUT</button>
          </div>
        </>
      );
    } else{
      return (
        <>
          <div className="">
            <h1>input</h1>
            <input type="text" id="inputHours" value={this.state.hours} onChange={this.inputHours}/>
            <input type="text" id="inputMinute" value={this.state.minute} onChange={this.inputMinute}/>
            <input type="text" id="inputSecond" value={this.state.second} onChange={this.inputSecond}/>
            <button onClick={this.changeInput} >CLOCK</button>
            <button onClick={this.start} >START</button>
          </div>
        </>
      )
    }
  }
}