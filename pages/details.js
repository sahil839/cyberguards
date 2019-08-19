import React, { Component } from "react";
import { Card, Grid, Button, Container } from "semantic-ui-react";
import Voter from "../blockvote/deployed/voter";
import VoterFactory from "../blockvote/deployed/voter_factory";
import { Router } from "../routes";
import web3 from "../blockvote/deployed/web3";

class UserDetails extends Component {
  state = {
    admin: "",
    voter: {
      aadhaar: 0,
      d: 0,
      m: 0,
      y: 0,
      name: "",
      ward: 0,
      hasVoted: false,
      isCandidate: false,
      candidateAddress: 0
    },
    voterAddress: "",
    message: "Hi"
  };

  static async getInitialProps(props) {
    const { aadhaar } = props.query;
    return {
      aadhaar
    };
  }
  async componentDidMount() {
    const accounts = await web3.eth.getAccounts();
    this.setState({ admin: accounts[0] });
    const voterAddress = await VoterFactory.methods
      .returnVoterAddress(this.props.aadhaar)
      .call();
    // console.log(voterAddress);
    const voter = await Voter(voterAddress);
    // console.log(voter);
    const voterInfo = await voter.methods.returnVoterInfo().call();
    console.log(voterInfo);
    this.setState({ voter: voterInfo, voterAddress: voterAddress });
  }

  renderCards() {
    // console.log(this.state.voter);
    const items = [
      {
        key: "name",
        header: this.state.voter.name,
        meta: "Name",
        style: { overflowWrap: "break-word" }
      },
      {
        key: "aadhaar",
        header: this.state.voter.aadhaar,
        meta: "Aadhaar Number"
      },
      {
        key: "dob",
        header: `${this.state.voter[1]}-${this.state.voter[2]}-${
          this.state.voter[3]
        }`,
        meta: "Date of Birth"
      },
      {
        key: "ward",
        header: this.state.voter.ward,
        meta: "ward number"
      }
    ];
    return <Card.Group items={items} />;
  }

  becomeCandidate = async () => {
    const voter = await Voter(this.state.voterAddress);
    const accounts = await web3.eth.getAccounts();
    const account0 = accounts[0];
    console.log(this.state.admin, account0);
    const candidateAddress = await voter.methods
      .becomeCandidate(true, "BJP")
      .send({
        from: accounts[0],
        gas: 3000000
      });
    // console.log(candidateAddress);
    // Router.push(`/details/${this.state.aadhaar}`);
    // Router.push(`/candidatedetails/${this.state.voter.ward}`);
  };

  openCandidateList = () => {
    Router.push(`/candidatedetails/${this.state.voter.ward}`);
  };

  render() {
    return (
      <div>
        <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
        />
        <Container>
          <h3>Voter Details</h3>
          <Grid>
            <Grid.Row>
              <Grid.Column width={10}>{this.renderCards()}</Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>
                <Button primary onClick={this.openCandidateList}>
                  Vote
                </Button>
                <Button primary onClick={this.becomeCandidate}>
                  Become a Candidate
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default UserDetails;
