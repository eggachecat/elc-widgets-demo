import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ActiveWidgetDemo, PassiveWidgetDemo } from './widget';

class App extends React.Component {
  state = {
    startTime: 0,
    endTime: 0,
    data: {
      "v": "Number:0"
    },
    series: 0
  }

  constructor(props) {
    super(props)
    this.onUpdateTime = this.onUpdateTime.bind(this)
  }

  onUpdateTime(_startTime, _endTime) {
    this.setState({
      startTime: _startTime,
      endTime: _endTime
    })
  }

  render() {

    return (
      <div className="App">
        <div>
          <h1>App</h1>
          <div>series: {this.state.series}</div>
          <div>startTime: {this.state.startTime}</div>
          <div>endTime: {this.state.endTime}</div>
          <button onClick={() => { this.setState({ startTime: this.state.startTime + 1 }) }}>modify startTime</button>
          <button onClick={() => { this.setState({ endTime: this.state.endTime + 1 }) }}>modify endTime</button>
          <button onClick={() => { this.setState({ series: this.state.series + 1 }) }}>modify series</button>
        </div>
        <div>
          <h3>主动模式</h3>
          <ActiveWidgetDemo startTime={this.state.startTime} endTime={this.state.endTime} onUpdateTime={this.onUpdateTime} series={this.state.series} />
        </div>
        <div>
          <h3 style={{ color: 'red' }}>被动模式</h3>
          <PassiveWidgetDemo data={this.state.data} />
        </div>
      </div>
    );
  }
}

export default App;
