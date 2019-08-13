import React, { Component } from "react";
import { Card, Grid, Button, Container } from "semantic-ui-react";

class UserDetails extends Component {
  renderCards() {
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
        header: "1",
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
