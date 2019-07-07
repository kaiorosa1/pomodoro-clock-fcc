class App extends React.Component {
  render() {
    return (
      React.createElement("div", null,
      React.createElement(Clock, null)));


  }}

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: "25",
      minutes: "00",
      on: true,
      break: false,
      label: "Session",
      sessionTime: 25,
      breakTime: 5 };

    this.runClock = this.runClock.bind(this);
    this.resetClock = this.resetClock.bind(this);
    this.changeTimeSession = this.changeTimeSession.bind(this);
    this.changeTimeBreak = this.changeTimeBreak.bind(this);
  }
  runClock() {
    this.setState({
      on: !this.state.on });

    var timer = setInterval(() => {
      let time = Number(this.state.time);
      let minute = Number(this.state.minutes);
      if (time === 0 && minute === 0) {
        document.getElementById("beep").play();
        if (this.state.break === false) {
          let t = this.state.breakTime;
          if (t < 10) {
            t = "0" + t;
          }
          this.setState({
            break: !this.state.break,
            label: "Break",
            time: String(t),
            minutes: "01" });

        } else {
          let t = this.state.sessionTime;
          if (t < 10) {
            t = "0" + t;
          }
          this.setState({
            break: !this.state.break,
            label: "Session",
            time: String(t),
            minutes: "01" });

        }

        time = Number(this.state.time);
        minute = Number(this.state.minutes);
      }

      if (time >= 0 && minute >= 0 && this.state.on === false) {
        if (this.state.minutes == "00" && time > 0) {
          time--;
          minute = 59;
        } else if (minute > 0) {
          minute--;
        }

        if (time < 10) {
          time = "0" + String(time);
        }
        if (minute < 10) {
          minute = "0" + String(minute);
        }

        this.setState({
          time: String(time),
          minutes: String(minute) });

      }
      if (this.state.on === true) {
        clearInterval(timer);
      }
    }, 1000);
  }

  resetClock() {

    this.setState({
      time: "25",
      minutes: "00",
      on: true,
      break: false,
      label: "Session",
      sessionTime: 25,
      breakTime: 5 });


    // stop the sound
    let selected = document.getElementById("beep");
    if (selected.currentTime >= 0) {
      selected.pause();
      selected.currentTime = 0;
    }

  }
  changeTimeBreak(e) {
    let br = this.state.breakTime;
    if (this.state.on === true) {
      if (e.target.id === "break-increment") {
        br++;
      }
      if (e.target.id === "break-decrement") {
        br--;
      }
      if (br >= 1 && br <= 60) {
        this.setState({
          breakTime: br });

      }
    }

  }
  changeTimeSession(e) {
    let session = this.state.sessionTime;
    if (this.state.on === true) {
      if (e.target.id === "session-increment") {
        session++;
      }
      if (e.target.id === "session-decrement") {
        session--;
      }
      if (session >= 1 && session <= 60) {
        this.setState({
          sessionTime: session,
          time: String(session) });

      }
    }


  }
  render() {
    return (
      React.createElement("div", { id: "container-clock" },
      React.createElement("h1", null, "Pomodoro Clock"),
      React.createElement("div", { id: "clock-full" },
      React.createElement("div", { id: "time-setting" },
      React.createElement("div", null,
      React.createElement("div", { id: "session-label" }, "Session Length"),
      React.createElement("span", { id: "session-increment", onClick: this.changeTimeSession }, " + "), React.createElement("span", { id: "session-length" }, this.state.sessionTime), React.createElement("span", { id: "session-decrement", onClick: this.changeTimeSession }, " - ")),

      React.createElement("div", null,
      React.createElement("div", { id: "break-label" }, "Break Length"),
      React.createElement("span", { id: "break-increment", onClick: this.changeTimeBreak }, " + "), React.createElement("span", { id: "break-length" }, this.state.breakTime), " ", React.createElement("span", { id: "break-decrement", onClick: this.changeTimeBreak }, "-"))),


      React.createElement("div", null,
      React.createElement("h2", { id: "timer-label" }, this.state.label),
      React.createElement("h1", { id: "time-left" }, this.state.time + ":" + this.state.minutes),
      React.createElement("button", { id: "start_stop", class: "btn btn-outline-primary", onClick: this.runClock }, "start/stop"),
      React.createElement("button", { id: "reset", class: "btn btn-outline-secondary", onClick: this.resetClock }, "reset"),
      React.createElement("audio", { controls: true, id: "beep", src: "https://goo.gl/65cBl1" })))));




  }}


ReactDOM.render(React.createElement(App, null), document.getElementById("app"));