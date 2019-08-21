import React, { Component } from "react";
import { Button, Form, Container, Grid } from "semantic-ui-react";
import Voter from "../deployed/voter";
import VoterFactory from "../deployed/voter_factory";
import web3 from "../deployed/web3";
import { connect } from "react-redux";
import { login } from "../actions";

class LoginForm extends Component {
  state = {
    aadhaar: "",
    message: ""
  };

  onSubmit = async event => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();
    const admin = accounts[0];

    this.setState({ message: "Checking the voter's aadhaar" });

    const voterAddress = await VoterFactory.methods
      .returnVoterAddress(this.state.aadhaar)
      .call();

    const voter = await Voter(voterAddress);
    const voterInfo = await voter.methods.returnVoterInfo().call();

    this.props.logIn(
      this.state.aadhaar,
      voterAddress,
      admin,
      voterInfo.ward,
      "+919460027791"
    );

    this.setState({ message: "Voter Check completed" });

    // this.props.history.push(`/voter/details`);
    this.props.history.push(`/checkotp`);
  };

  render() {
    return (
      <div
        style={{
          backgroundColor: "#f6f4fa",

        }}
      >
        <Container>
          <link
            rel="stylesheet"
            href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
          />

          <Grid
            textAlign="center"
            style={{ height: "100vh" }}
            verticalAlign="middle"
          >
            <Grid.Column style={{ maxWidth: 450 }}>
              <Form onSubmit={this.onSubmit}>
                <Form.Field>
                  <h2>Aadhaar Number</h2>
                  <input
                    placeholder="Aadhaar Number"
                    value={this.state.aadhaar}
                    onChange={event =>
                      this.setState({ aadhaar: event.target.value })
                    }
                  />
                </Form.Field>
                {/* <Form.Field>
            <Checkbox label="I agree to the Terms and Conditions" />
          </Form.Field> */}
                <Button type="submit">Login</Button>
              </Form>
              <h1>{this.state.message}</h1>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }
}

// export default LoginForm;

const mapStatetoProps = state => {
  const { isLoggedIn, aadhaar, voterAddress, admin, ward, mobile } = state;
  return {
    isLoggedIn,
    aadhaar,
    voterAddress,
    admin,
    ward,
    mobile
  };
};

const mapDispatchtoProps = dispatch => {
  return {
    logIn: (aadhaar, voterAddress, admin, voter, ward, mobile) =>
      dispatch(login(aadhaar, voterAddress, admin, voter, ward, mobile))
  };
};

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(LoginForm);
