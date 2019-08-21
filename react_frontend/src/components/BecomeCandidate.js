import React, { Component } from "react";
import { Button, Form, Container, Grid } from "semantic-ui-react";
import Voter from "../deployed/voter";
import { connect } from "react-redux";

class CandidateForm extends Component {
  state = {
    hasPoliceCase: "",
    party: ""
  };

  static async getInitialProps(props) {
    const { aadhaar } = props.query;
    return {
      aadhaar
    };
  }

  componentDidMount() {
    if (!this.props.isLoggedIn) this.props.history.push("/");
  }

  becomeCandidate = async () => {
    console.log(this.props);
    const voter = await Voter(this.props.voterAddress);
    await voter.methods
      .becomeCandidate(this.state.hasPoliceCase, this.state.party)
      .send({
        from: this.props.admin,
        gas: 3000000
      });
    this.props.history.push(`/voter/details`);
  };

  render() {
    return (
      <div
        style={{
          backgroundColor: "#ffffff",

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
              <Form onSubmit={this.becomeCandidate}>
                <Form.Field>
                  <h2>Enter the Annual Income</h2>
                  <input
                    placeholder="Enter the income as specified in ITR"
                    value={this.state.hasPoliceCase}
                    onChange={event =>
                      this.setState({ hasPoliceCase: event.target.value })
                    }
                  />
                  <h2>Party Name</h2>
                  <input
                    placeholder="Enter the registered Party Name"
                    value={this.state.party}
                    onChange={event =>
                      this.setState({ party: event.target.value })
                    }
                  />
                </Form.Field>
                <Button type="submit">Submit</Button>
              </Form>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }
}

// export default CandidateForm;

const mapStatetoProps = state => {
  const { isLoggedIn, aadhaar, voterAddress, admin } = state;
  return {
    isLoggedIn,
    aadhaar,
    voterAddress,
    admin
  };
};

export default connect(
  mapStatetoProps,
  null
)(CandidateForm);
