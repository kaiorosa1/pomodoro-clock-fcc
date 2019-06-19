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
      clear: false,
      breakLength: "5",
      sessionLength: "25" };

    this.setBreakLength = this.setBreakLength.bind(this);
    this.setSessionLength = this.setSessionLength.bind(this);
    this.changeTime = this.changeTime.bind(this);
    this.runClock = this.runClock.bind(this);
    this.hasStarted = this.hasStarted.bind(this);
  }
  // run the clock time
  runClock(seconds) {
    if (this.state.started === true && Number(seconds)) {
      let minutes = Math.round((seconds - 30) / 60);
      let remainingSeconds = seconds % 60;
      if (remainingSeconds < 10) {
        remainingSeconds = "0" + remainingSeconds;
      }
      let result = minutes + ":" + remainingSeconds;
      if (seconds <= 0) {
        // stop when the seconds get to zero
        this.setState({
          timeLeft: "0:00",
          started: false });


        clearInterval();
      } else {
        this.setState({
          timeLeft: result });

      }

    }

  }
  setBreakLength(time) {
    this.setState({
      breakLength: time });

  }
  setSessionLength(time) {
    this.setState({
      sessionLength: time });

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
        breakLength: this.state.breakLength,
        sessionLength: this.state.sessionLength,
        setBreakLength: this.setBreakLength,
        setSessionLength: this.setSessionLength }),

      React.createElement(Display, {
        sessionLength: this.state.sessionLength,
        timeLeft: this.state.timeLeft }),

      React.createElement(TimeFunctionality, {
        started: this.state.started,
        hasStarted: this.hasStarted,
        runClock: this.runClock,
        timeLeft: this.state.timeLeft,
        changeTime: this.changeTime,
        breakLength: this.state.breakLength,
        sessionLength: this.state.sessionLength,
        setBreakLength: this.setBreakLength,
        setSessionLength: this.setSessionLength })));



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
    this.changeBreak = this.changeBreak.bind(this);
    this.changeSession = this.changeSession.bind(this);
  }
  changeBreak(e) {
    let newBreak;
    if (e.target.id === "break-increment") {
      newBreak = Number(this.props.breakLength) + 1;
      if (newBreak <= 60) {
        this.props.setBreakLength(String(newBreak));
      }
    } else if (e.target.id === "break-decrement") {
      newBreak = Number(this.props.breakLength) - 1;
      if (newBreak > 0) {
        this.props.setBreakLength(String(newBreak));
      }

    }

  }
  changeSession(e) {
    let newSession;
    if (e.target.id === "session-increment") {
      newSession = Number(this.props.sessionLength) + 1;
      if (newSession <= 60) {
        this.props.setSessionLength(String(newSession));
      }
    } else if (e.target.id === "session-decrement") {
      newSession = Number(this.props.sessionLength) - 1;
      if (newSession > 0) {
        this.props.setSessionLength(String(newSession));
      }

    }
  }
  render() {
    return (
      React.createElement("div", null,
      React.createElement("div", { id: "break-session" },
      React.createElement("div", { id: "break-info" },
      React.createElement("div", { id: "break-label" }, "Break Length"),
      React.createElement("div", { id: "break-increment", onClick: this.changeBreak }, "+"),


      React.createElement("div", { id: "break-length" }, this.props.breakLength),
      React.createElement("div", { id: "break-decrement", onClick: this.changeBreak }, "-")),

      React.createElement("div", { id: "session-info" },
      React.createElement("div", { id: "session-label" }, "Session Length"),
      React.createElement("div", { id: "session-increment", onClick: this.changeSession }, "+"),
      React.createElement("div", { id: "session-length" }, this.props.sessionLength),
      React.createElement("div", { id: "session-decrement", onClick: this.changeSession }, "-")))));




  }}

class TimeFunctionality extends React.Component {
  constructor(props) {
    super(props);
    this.resetClock = this.resetClock.bind(this);
    this.startClock = this.startClock.bind(this);
  }
  startClock() {
    // start-stop toggle
    if (this.props.started === true) {
      this.props.hasStarted(false);
      // this.props.setSessionLength(this.props.timeLeft);
    } else {
      this.props.hasStarted(true);
    }
    // set this time equals to the time in the session length
    let x = Number(this.props.sessionLength) * 60;
    setInterval(() => {
      this.props.runClock(String(x));
      x--;
    }, 1000);
  }
  resetClock() {
    this.props.changeTime("25:00");
    this.props.hasStarted(false);
    this.props.setBreakLength("5");
    this.props.setSessionLength("25");
  }
  render() {
    return (
      React.createElement("div", null,
      React.createElement("div", { id: "functionality" },
      React.createElement("button", { id: "start_stop", onClick: this.startClock }, "Start"),


      React.createElement("button", { id: "reset", onClick: this.resetClock }, "Reset"))));





  }}


ReactDOM.render(React.createElement(App, null), document.getElementById("app"));