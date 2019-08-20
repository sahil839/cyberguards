import React, { Component } from "react";
import { Card, Grid, Button, Container } from "semantic-ui-react";
import Voter from "../blockvote/deployed/voter";
import VoterFactory from "../blockvote/deployed/voter_factory";
import Candidate from "../blockvote/deployed/candidate";
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
    candidate: {},
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
    if (voterInfo.isCandidate) {
      const candidate = await Candidate(voterInfo.candidateAddress)
        .methods.returnCandidateInfo()
        .call();
      const candidateInfo = {
        name: candidate[0],
        aadhaar: candidate[1],
        party: candidate[2]
      };
      console.log(candidateInfo);
      this.setState({ candidate: candidateInfo });
    }
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

  becomeCandidate = () => {
    Router.push(`/candidate/${this.props.aadhaar}`);
  };

  openCandidateList = () => {
    Router.push(`/candidatedetails/${this.state.voter.ward}`);
  };

  render() {
    let button, temp;
    if (!this.state.voter.isCandidate) {
      console.log(this.state.candidate);
      button = (
        <Button primary onClick={this.becomeCandidate}>
          Become a Candidate
        </Button>
      );
      temp = null;
    } else {
      button = null;
      temp = (
        <div>
          <Grid.Row>
            <h3>Candidate Details</h3>
          </Grid.Row>
          <Grid.Row>
            <div className="ui card">
              <div className="content">
                <div className="header">{this.state.candidate.party}</div>
                <div className="meta">
                  <span className="date">Party Name</span>
                </div>
              </div>
            </div>
          </Grid.Row>
        </div>
      );
    }
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
            {temp}
            <Grid.Row>
              <Grid.Column>
                <Button primary onClick={this.openCandidateList}>
                  Vote
                </Button>
                {button}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default UserDetails;
