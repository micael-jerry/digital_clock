import React from "react";
import "./Clock.css";

export class ClockClassComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            timer: null,
            enterValue: false,
            hours: 1,
            minute: 1,
            second: 1,
            incOrDec: 500,
            timestamp: new Date().getTime()
        };
        this.changeInput = this.changeInput.bind(this);
        this.input = this.input.bind(this);
        this.start = this.start.bind(this);
        this.restart = this.restart.bind(this);
    }

    componentDidMount() {
        this.setState({
            timer: setInterval(() => this.setState(state => ({
                date: new Date(state.timestamp),
                timestamp: state.timestamp + state.incOrDec
            })), 1000),
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
    }

    padStartDigit(digit) {
        return digit.toString().padStart(2, "0");
    }

    changeInput() {
        this.setState(state => ({
            enterValue: !state.enterValue
        }))
    }

    input(event) {
        const name = event.target.name ;
        this.setState({
            [name] : parseInt(event.target.value)
        })
    }
    start() {
        this.setState(state => ({
            incOrDec: -500,
            timestamp: new Date(new Date().getYear(), new Date().getMonth(), new Date().getDay(), state.hours, state.minute, state.second).getTime()
        }));
        this.changeInput()
    }

    restart() {
        this.setState({
            hours: 0,
            minute: 0,
            second: 0,
            incOrDec: 500,
            timestamp: new Date().getTime()
        });
    }

    render() {
        if (this.state.enterValue === false) {
            if (this.state.date.getHours() === 0 && this.state.date.getMinutes() === 0 && this.state.date.getSeconds() === 0) {
                return (
                    alert("👾👾👾👾👾👾👾👾👾TIME COULE👾👾👾👾👾👾👾👾👾")
                )
            }
            return (
                <div className="clock">
                    <div className="value">
                        <span>{this.padStartDigit(this.state.date.getHours())}: </span>
                        <span>{this.padStartDigit(this.state.date.getMinutes())}: </span>
                        <span>{this.padStartDigit(this.state.date.getSeconds())}</span>
                    </div>
                    <div className="divButton">
                        <button className="button" onClick={this.changeInput}>TIMER</button>
                        <button className="button" onClick={this.restart}>CLOCK</button>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <div className="clock">
                        <div className="value">
                            <input className="input" type="text" id="inputHours" onChange={this.input} name={"hours"}/>
                            <input className="input" type="text" id="inputMinute" onChange={this.input} name={"minute"}/>
                            <input className="input" type="text" id="inputSecond" onChange={this.input} name={"second"}/>
                        </div>
                        <div className="divButton">
                            <button className="button" onClick={this.start}>START</button>
                            <button className="button" onClick={this.changeInput}>CANCEL</button>
                        </div>
                    </div>
                </div>
            )
        }
    }
}