import React, { Component } from "react";
import { Button, Checkbox, Form, Container } from "semantic-ui-react";
import Voter from "../blockvote/deployed/voter";
import VoterFactory from "../blockvote/deployed/voter_factory";
import { Router } from "../routes";

class LoginForm extends Component {
  state = {
    aadhaar: "",
    message: ""
  };
  onSubmit = async event => {
    event.preventDefault();
    this.setState({ message: "Checking the voter's aadhaar" });
    const voter = await VoterFactory.methods
      .returnVoterAddress(this.state.aadhaar)
      .call();
    console.log(voter);
    this.setState({ message: "Voter Check completed" });
    Router.push(`/details/${this.state.aadhaar}`);
  };
  render() {
    return (
      <Container>
        <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
        />
        <Form onSubmit={this.onSubmit}>
          <Form.Field>
            <label>Aadhaar Number</label>
            <input
              placeholder="Aadhar Number"
              value={this.state.aadhaar}
              onChange={event => this.setState({ aadhaar: event.target.value })}
            />
          </Form.Field>
          {/* <Form.Field>
            <Checkbox label="I agree to the Terms and Conditions" />
          </Form.Field> */}
          <Button type="submit">Login</Button>
        </Form>
        <h1>{this.state.message}</h1>
      </Container>
    );
  }
}

export default LoginForm;
