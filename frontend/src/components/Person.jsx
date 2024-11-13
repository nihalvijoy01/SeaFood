import React, { Component } from "react";

class Person extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  render() {
    return (
      <>
        <h1>Welcome {this.props.empl}</h1>
        <h2>Your age is {this.props.age * 3}</h2>
        <h2>Your salary is {parseFloat(this.props.salary) * 2}</h2>
      </>
    );
  }
}

export default Person;
