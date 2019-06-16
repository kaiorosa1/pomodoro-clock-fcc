class App extends React.Component {
  render() {
    return (
      React.createElement("div", null,
      React.createElement("h1", null, "Pomodoro Clock (FCC)"),
      React.createElement(Clock, null)));


  }}


class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeLeft: "25:00" };

    this.changeTime = this.changeTime.bind(this);
  }
  changeTime(time) {
    this.setState({
      timeLeft: time });

  }
  render() {
    return (
      React.createElement("div", null,
      React.createElement(TimeSetting, null),
      React.createElement(Display, { timeLeft: this.state.timeLeft }),
      React.createElement(TimeFunctionality, { changeTime: this.changeTime })));


  }}


class Display extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      React.createElement("div", { id: "display" },
      React.createElement("div", { id: "timer-label" }, "Session"),
      React.createElement("h1", { id: "time-left" }, this.props.timeLeft)));


  }}

class TimeSetting extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      React.createElement("div", null,
      React.createElement("div", { id: "break-session" },
      React.createElement("div", { id: "break-info" },
      React.createElement("div", { id: "break-label" }, "Break Length"),
      React.createElement("div", { id: "break-increment" }, "+"),
      React.createElement("div", { id: "break-length" }, "5"),
      React.createElement("div", { id: "break-decrement" }, "-")),

      React.createElement("div", { id: "session-info" },
      React.createElement("div", { id: "session-label" }, "Session Length"),
      React.createElement("div", { id: "session-increment" }, "+"),
      React.createElement("div", { id: "session-length" }, "25"),
      React.createElement("div", { id: "session-decrement" }, "-")))));




  }}

class TimeFunctionality extends React.Component {
  constructor(props) {
    super(props);
    this.startClock = this.startClock.bind(this);
    this.resetClock = this.resetClock.bind(this);
  }
  startClock() {
    this.props.changeTime("10:00");
  }
  resetClock() {
    this.props.changeTime("25:00");
  }
  render() {
    return (
      React.createElement("div", null,
      React.createElement("div", { id: "functionality" },
      React.createElement("button", { id: "start_stop", onClick: this.startClock }, "Start"),
      React.createElement("button", { id: "reset", onClick: this.resetClock }, "Reset"))));



  }}


ReactDOM.render(React.createElement(App, null), document.getElementById("app"));

// function caculateTime(){
//     let seconds = 1500;
//     let minutes = Math.round((seconds - 30)/60);
//     let remainingSeconds = seconds % 60;
//     if (remainingSeconds < 10) {
//         remainingSeconds = "0" + remainingSeconds;
//     }
//     var result = minutes + ":" + remainingSeconds;
//     if (seconds == 0) {
//         clearInterval(countdownTimer);
//     } else {
//         seconds--;
//     }
//   }

//  let countdownTimer = setInterval('calculateTime()', 1000);