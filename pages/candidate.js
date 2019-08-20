import React, { Component } from "react";
import { Button, Checkbox, Form, Container } from "semantic-ui-react";
import VoterFactory from "../blockvote/deployed/voter_factory";
import Voter from "../blockvote/deployed/voter";
import web3 from "../blockvote/deployed/web3";

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

  becomeCandidate = async () => {
    const accounts = await web3.eth.getAccounts();
    this.setState({ admin: accounts[0] });
    const voterAddress = await VoterFactory.methods
      .returnVoterAddress(this.props.aadhaar)
      .call();
    const voter = await Voter(voterAddress);
    const candidateAddress = await voter.methods
      .becomeCandidate(this.state.hasPoliceCase, this.state.party)
      .send({
        from: accounts[0],
        gas: 3000000
      });
    Router.push(`/details/${this.state.aadhaar}`);
  };
  render() {
    return (
      <Container>
        <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
        />
        <Form onSubmit={this.becomeCandidate}>
          <Form.Field>
            <label>Criminal Records</label>
            <input
              placeholder="Criminal Records"
              value={this.state.hasPoliceCase}
              onChange={event =>
                this.setState({ hasPoliceCase: event.target.value })
              }
            />
            <label>Party Name</label>
            <input
              placeholder="Party Name"
              value={this.state.party}
              onChange={event => this.setState({ party: event.target.value })}
            />
          </Form.Field>
          <Button type="submit">Submit</Button>
        </Form>
      </Container>
    );
  }
}

export default CandidateForm;
