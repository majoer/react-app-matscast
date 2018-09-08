import './App.scss';
import React, { Component } from "react";
import Matscast from 'matscast';
import { environment } from 'environment';

let muted = false;

class App extends Component {

  constructor() {
    super();
    this.videoRef = React.createRef();
    this.currentTimeInterval = undefined;
  }

  state = {
    matscast: null
  }

  componentDidMount() {
    const matscast = new Matscast(new WebSocket(environment.URL_WS_API_MATSCAST));
    const video = this.videoRef.current;

    this.registerVideoEvents(matscast, video);
    this.registerMatscastEvents(matscast, video);
    this.registerCurrentTimeInterval(matscast, video);
    this.setState({
      matscast
    });
  }

  registerVideoEvents(matscast, video) {
    video.onplay = () => matscast.sendMessage(Matscast.EVENT_VIDEO_PLAY);
    video.onpause = () => matscast.sendMessage(Matscast.EVENT_VIDEO_PAUSE);
    video.onseeking = (e) => matscast.sendMessage(Matscast.EVENT_VIDEO_SEEKING, e.value);
    video.onseeked = (e) => matscast.sendMessage(Matscast.EVENT_VIDEO_SEEKED, e.value);
    video.onvolumechange = () => {
      if (muted !== video.muted) {
        muted = video.muted;

        if (video.muted) {
          matscast.sendMessage(Matscast.EVENT_VIDEO_MUTE);
        } else {
          matscast.sendMessage(Matscast.EVENT_VIDEO_UNMUTE);
        }
      } else {
        matscast.sendMessage(Matscast.EVENT_VIDEO_VOLUME, video.volume);
      }
    };
    video.onprogress = () => matscast.sendMessage('progress');
    video.onended = () => matscast.sendMessage(Matscast.EVENT_VIDEO_ENDED);
  }

  registerMatscastEvents(matscast, video) {
    matscast.on(Matscast.EVENT_VIDEO_PLAY, () => video.play());
  }

  registerCurrentTimeInterval(matscast, video) {
    setInterval(() => {
      if (!video.paused) {
        matscast.sendMessage(Matscast.EVENT_VIDEO_CURRENT_TIME, video.currentTime);
      }
    }, environment.INTERVAL_SEND_CURRENT_TIME);
  }

  componentWillUnmount() {
    matscast.removeAllListeners();
    clearInterval(this.currentTimeInterval);
  }

  render() {
    return <div>
      <video width="700" ref={this.videoRef} controlsList="nodownload" controls src="https://www.w3schools.com/tags/movie.ogg">
      </video>
    </div>;
  }
}

export { App };
