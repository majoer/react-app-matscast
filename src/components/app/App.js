import './App.scss';
import React, { Component } from "react";
import Matscast from 'matscast';

class App extends Component {

  constructor() {
    super();
    this.videoRef = React.createRef();
  }

  state = {
    matscast: null
  }

  componentDidMount() {
    this.registerVideoWebSocket();
    this.registerVideoEvents();
  }

  registerVideoWebSocket() {
    debugger;
    this.setState({
      matscast: new Matscast(new WebSocket('ws:localhost:4200'))
    });
  }

  registerVideoEvents() {
    // this.videoRef.on('play', () => {
    //   console.log('onPlay');
    // });
  }

  render() {
    return <div>
      <video width="500" ref={this.videoRef} />
    </div>;
  }
}

export { App };
