import React, { Component } from "react";
import { Card, Grid, Button, Container } from "semantic-ui-react";
import Voter from "../blockvote/deployed/voter";
import VoterFactory from "../blockvote/deployed/voter_factory";

class UserDetails extends Component {
  static async getInitialProps(props) {
    const voterAddress = await VoterFactory.methods.returnVoterAddress(
      props.query.aadhaar
    );
    const voter = await Voter(voterAddress);
    const voterAadhaar = await voter.methods.displayHasVoted();
    const voterVoteStatus = await voter.methods.returnVoterInfo();
      // console.log(voterVoteStatus);
    return {
      aadhaar: props.query.aadhaar
    };
  }

  renderCards() {
    console.log(this.props.aadhaar);
    // const voter = Voter(this.props.aadhaar);
    const items = [
      {
        header: "Sahil",
        meta: "Name",
        style: { overflowWrap: "break-word" }
      },
      {
        header: "6174-2876-9876",
        meta: "Aadhaar Number"
      },
      {
        header: "06-09-199",
        meta: "Date of Birth"
      },
      {
        header: this.props.aadhaar,
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
