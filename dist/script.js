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
      React.createElement(TimeFunctionality, null)));


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
  render() {
    return React.createElement("div", null,
    React.createElement("div", { id: "functionality" },

    React.createElement("button", { id: "start_stop" }, "Start"),
    React.createElement("button", { id: "reset" }, "Reset")));


  }}


ReactDOM.render(React.createElement(App, null), document.getElementById("app"));