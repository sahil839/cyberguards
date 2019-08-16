import React, { Component } from "react";
import { Card, Grid, Button, Container } from "semantic-ui-react";
import Voter from "../blockvote/deployed/voter";
import VoterFactory from "../blockvote/deployed/voter_factory";

class UserDetails extends Component {
  state = {
    voter: {
      aadhaar: 0,
      d: 0,
      m:0, y:0,name: "",
      ward: 0,
      hasVoted: "",
      isCandidate: "",
      candidateAddress: 0
    },
    message: "Hi"
  };

  static async getInitialProps(props) {
    const { aadhaar } = props.query;
    return {
      aadhaar
    };
  }
  async componentDidMount() {
    const voterAddress = await VoterFactory.methods
      .returnVoterAddress(this.props.aadhaar)
      .call();
    console.log(voterAddress);
    const voter = await Voter(voterAddress);
    console.log(voter);
    const voterInfo = await voter.methods.returnVoterInfo().call();
    console.log(voterInfo);
    this.setState({voter : voterInfo});
  }

  renderCards() {
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
        key:"dob",
        header: `${this.state.voter[1]}-${this.state.voter[2]}-${this.state.voter[3]}`,
        meta: "Date of Birth"
      },
      {
        key:"ward",
        header: this.state.voter.ward,
        meta: "ward number"
      }
    ];

    return <Card.Group items={items} />;
  }

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
                <Button primary>Vote</Button>
                <Button primary>Become a Candidate</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default UserDetails;
