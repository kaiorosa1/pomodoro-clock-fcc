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
      timeLeft: "25:00",
      started: false,
      break: "5",
      session: "25" };

    this.getBreakValue = this.getBreakValue.bind(this);
    this.getSessionValue = this.getSessionValue.bind(this);
    this.changeTime = this.changeTime.bind(this);
    this.runClock = this.runClock.bind(this);
    this.hasStarted = this.hasStarted.bind(this);
  }
  // run the clock time
  runClock(seconds) {
    if (this.state.started === true) {
      let minutes = Math.round((seconds - 30) / 60);
      let remainingSeconds = seconds % 60;
      if (remainingSeconds < 10) {
        remainingSeconds = "0" + remainingSeconds;
      }
      let result = minutes + ":" + remainingSeconds;
      if (seconds == 0) {
        // stop when the seconds get to zero
        clearInterval();
      } else {
        seconds--;
      }
      this.setState({
        timeLeft: result });

    }
  }
  getBreakValue(time) {
    this.setState({
      break: time });

  }
  getSessionValue(time) {
    this.setState({
      session: time });

  }
  changeTime(time) {
    this.setState({
      timeLeft: time });

  }
  hasStarted(isOn) {
    this.setState({
      started: isOn });

  }
  render() {
    return (
      React.createElement("div", null,
      React.createElement(TimeSetting, {
        getBreakTime: this.getBreakValue,
        getSessionTime: this.getSessionValue }),

      React.createElement(Display, {
        sessionTime: this.state.session,
        timeLeft: this.state.timeLeft }),

      React.createElement(TimeFunctionality, {
        runClock: this.runClock,
        changeTime: this.changeTime,
        isOn: this.hasStarted,
        breakTime: this.state.break,
        sessionTime: this.state.session })));



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
    this.state = {
      breakTime: "5",
      sessionTime: "25" };

    this.incrementTimeByOneBreak = this.incrementTimeByOneBreak.bind(this);
    this.decrementTimeByOneBreak = this.decrementTimeByOneBreak.bind(this);
    this.incrementTimeByOnePomodoro = this.incrementTimeByOnePomodoro.bind(this);
    this.decrementTimeByOnePomodoro = this.decrementTimeByOnePomodoro.bind(this);
  }
  incrementTimeByOneBreak() {
    let addBreakTime = Number(this.state.breakTime) + 1;
    this.setState({
      breakTime: addBreakTime });

    this.props.getBreakTime(addBreakTime);
  }
  decrementTimeByOneBreak() {
    let subtractBreakTime = Number(this.state.breakTime) - 1;
    if (subtractBreakTime >= 0) {
      this.setState({
        breakTime: subtractBreakTime });

    }
    this.props.getBreakTime(subtractBreakTime);
  }
  incrementTimeByOnePomodoro() {
    let addPomodoroTime = Number(this.state.sessionTime) + 1;
    this.setState({
      sessionTime: addPomodoroTime });

    this.props.getSessionTime(addPomodoroTime);
  }
  decrementTimeByOnePomodoro() {
    let subtractPomodoroTime = Number(this.state.sessionTime) - 1;
    if (subtractPomodoroTime >= 0) {
      this.setState({
        sessionTime: subtractPomodoroTime });

    }
    this.props.getSessionTime(subtractPomodoroTime);
  }
  render() {
    return (
      React.createElement("div", null,
      React.createElement("div", { id: "break-session" },
      React.createElement("div", { id: "break-info" },
      React.createElement("div", { id: "break-label" }, "Break Length"),
      React.createElement("div", { id: "break-increment", onClick: this.incrementTimeByOneBreak }, "+"),


      React.createElement("div", { id: "break-length" }, this.state.breakTime),
      React.createElement("div", { id: "break-decrement", onClick: this.decrementTimeByOneBreak }, "-")),

      React.createElement("div", { id: "session-info" },
      React.createElement("div", { id: "session-label" }, "Session Length"),
      React.createElement("div", { id: "session-increment", onClick: this.incrementTimeByOnePomodoro }, "+"),
      React.createElement("div", { id: "session-length" }, this.state.sessionTime),
      React.createElement("div", { id: "session-decrement", onClick: this.decrementTimeByOnePomodoro }, "-")))));




  }}

class TimeFunctionality extends React.Component {
  constructor(props) {
    super(props);
    this.startClock = this.startClock.bind(this);
    this.resetClock = this.resetClock.bind(this);
  }
  startClock() {
    this.props.isOn(true);
    // set this time equals to the time in the session length
    let x = Number(this.props.sessionTime) * 60;
    setInterval(() => {
      this.props.runClock(x);
      x--;
    }, 1000);
  }
  resetClock() {
    this.props.isOn(false);
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