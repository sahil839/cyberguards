import React, { Component } from "react";
import { Header, Container, Grid, Button } from "semantic-ui-react";

class Home extends Component {
  //   async componentDidMount() {
  //     if (!this.props.isLoggedIn) this.props.history.push("/");
  //     let winner = await Ballot.methods.displayelected(this.props.ward).call();
  //     let candidate = await Candidate(winner);
  //     let winnerInfo = await candidate.methods.returnCandidateInfo().call();
  //     console.log(winnerInfo);
  //     let info = {
  //       name: winnerInfo[0],
  //       aadhaar: winnerInfo[1],
  //       party: winnerInfo[2]
  //     };
  //     let count = await candidate.methods.returnvotecount().call();
  //     this.setState({ winnerInfo: info, count: count });
  //   }
  loginLink = () => {
    this.props.history.push(`/login`);
  };

  render() {
    return (
      <div
        style={{
          backgroundColor: "#f0efee",
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
              <Header as="h1" textAlign="center" style={{ margin: "20px" }}>
                BLOCK-VOTE
              </Header>
              <Header
                as="h2"
                textAlign="center"
                style={{ marginBottom: "20px" }}
              >
                A Stand-alone Voting Application on Blockchain.
              </Header>
              <Button primary onClick={this.loginLink}>
                Go to Login page
              </Button>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default Home;
