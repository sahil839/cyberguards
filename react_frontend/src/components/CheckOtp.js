import React, { Component } from "react";
import { Button, Form, Container, Grid } from "semantic-ui-react";
import { connect } from "react-redux";

class OTPForm extends Component {
  state = {
    otp: "",
    message: ""
  };

  componentDidMount() {
    if (!this.props.isLoggedIn) this.props.history.push("/");
    this.setState({ message: "Sending OTP" });

    fetch("http://localhost:3001/api/sendOTP", {
      method: "POST",
      body: new URLSearchParams(`mobile=${this.props.mobile}`)
    })
      .then(res => {
        console.log(res);
        this.setState({
          message: "OTP Sent. Enter the OTP received on your mobile"
        });
      })
      .catch(e => {
        console.log(e);
        this.setState({
          message: "Error in connection"
        });
      });

    this.setState({
      message: "OTP Sent on registered mobile number."
    });
  }

  onSubmit = async event => {
    event.preventDefault();
    this.setState({ message: "Verifying OTP" });

    fetch("http://localhost:3001/api/verifyOTP", {
      method: "POST",
      body: new URLSearchParams(
        `mobile=${this.props.mobile}&otp=${this.state.otp}`
      )
    })
      .then(response => response.json())
      .then(data => this.setState({ message: data }))
      .catch(e => {
        console.log(e);
        this.setState({
          message: "Failed"
        });
      });

    this.setState({ message: "OTP Verified" });

    this.props.history.push("/voter/details");
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
                  <h2>Enter the OTP</h2>
                  <input
                    placeholder="6 digit OTP"
                    value={this.state.otp}
                    onChange={event =>
                      this.setState({ otp: event.target.value })
                    }
                  />
                </Form.Field>
                <Button type="submit">Submit</Button>
              </Form>
              <h3>{this.state.message}</h3>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }
}

// export default LoginForm;

const mapStatetoProps = state => {
  const { mobile, isLoggedIn } = state;
  return {
    mobile,
    isLoggedIn
  };
};

export default connect(
  mapStatetoProps,
  null
)(OTPForm);
