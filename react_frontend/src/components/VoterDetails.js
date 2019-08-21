import React, { Component } from "react";
import { Card, Grid, Button, Container } from "semantic-ui-react";
import Voter from "../deployed/voter";
import Candidate from "../deployed/candidate";
import Admin from "../deployed/admin";
import { connect } from "react-redux";

class VoterDetails extends Component {
  state = {
    voter: {
      aadhaar: 0,
      d: 0,
      m: 0,
      y: 0,
      name: "",
      ward: 0,
      hasVoted: false,
      isCandidate: false,
      candidateAddress: 0,
      resultDeclared: true
    },
    candidate: {},
    voterAddress: "",
    message: ""
  };

  async componentDidMount() {
    if (!this.props.isLoggedIn) this.props.history.push("/");
    else {
      const resultDate = await Admin.methods.returnResultDate().call();
      console.log(resultDate);
      const result_date = new Date(
        resultDate.year,
        resultDate.month,
        resultDate.day
      );
      const cur_date = new Date();
      if (cur_date >= result_date) {
        this.setState({
          message: `Result to be announced on ${result_date.getDate()}/${result_date.getMonth()}/${result_date.getFullYear()}`,
          resultDeclared: false
        });
      }
      const voter = await Voter(this.props.voterAddress);
      const voterInfo = await voter.methods.returnVoterInfo().call();
      console.log(voterInfo);

      this.setState({ voter: voterInfo });

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
        key: "dob",
        header: `${this.state.voter[1]}-${this.state.voter[2]}-${
          this.state.voter[3]
        }`,
        meta: "Date of Birth"
      },
      {
        key: "ward",
        header: this.state.voter.ward,
        meta: "Ward Number/Constituency"
      }
    ];
    return <Card.Group style={{marginLeft:'40px'}} items={items} />;
  }

  becomeCandidate = () => {
    this.props.history.push(`/candidate/details`);
  };

  openCandidateList = () => {
    this.props.history.push(`/candidate/list`);
  };

  openResultsPage = () => {
    this.props.history.push(`/results`);
  };

  renderIfVoted() {
    let voteBtn;
    if (this.state.voter.hasVoted) {
      voteBtn = (
        <Button primary onClick={this.openResultsPage} disabled={this.state.resultDeclared}>
          Check Results
        </Button>
      );
    } else {
      voteBtn = (
        <Button primary onClick={this.openCandidateList}>
          Vote
        </Button>
      );
    }
    console.log(voteBtn);
    return voteBtn;
  }

  renderCandidateInfo() {
    let becomeCandidateBtn, candidateInfo;
    if (!this.state.voter.isCandidate) {
      becomeCandidateBtn = (
        <Button primary onClick={this.becomeCandidate}>
          Become a Candidate
        </Button>
      );
      candidateInfo = null;
    } else {
      becomeCandidateBtn = null;
      candidateInfo = (
        <div>
            <h2 style={{marginTop:'5px'}}>Candidate Details</h2>

          <Grid.Row style={{marginLeft:'44px'}}>
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
    return { becomeCandidateBtn, candidateInfo };
  }

  render() {
    const { becomeCandidateBtn, candidateInfo } = this.renderCandidateInfo();
    const voteBtn = this.renderIfVoted();
    return (
      <div
      style={{
        backgroundColor: "#f6f4fa",

      }}>

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
        <h2>Voter Details</h2>
            <Grid.Row>
              {this.renderCards()}
            </Grid.Row>
            <Grid.Row>
              {candidateInfo}
            </Grid.Row>
            <Grid.Row style={{marginTop:'10px'}}>
              {voteBtn}
              </Grid.Row>
              <Grid.Row style={{marginTop:'10px'}}>
              {becomeCandidateBtn}
            </Grid.Row>
        <h1>{this.state.message}</h1>
        </Grid.Column>
      </Grid>
    </Container>
    </div>
    );
  }
}

// export default VoterDetails;

const mapStatetoProps = state => {
  return {
    isLoggedIn: state.isLoggedIn,
    aadhaar: state.aadhaar,
    voterAddress: state.voterAddress
  };
};

export default connect(
  mapStatetoProps,
  null
)(VoterDetails);
