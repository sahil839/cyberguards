import React, { Component } from "react";
import { Button, Container } from "semantic-ui-react";
import Candidate from "../deployed/candidate";
import CandidateFactory from "../deployed/candidate_factory";
import Ballot from "../deployed/ballot";
import { connect } from "react-redux";

class CandidateList extends Component {
  state = {
    admin: "",
    message: "Hi",
    candidateAddressList: [],
    candidateList: []
  };

  static async getInitialProps(props) {
    const { ward } = props.query;
    return {
      ward
    };
  }

  async componentDidMount() {
    if (!this.props.isLoggedIn) this.props.history.push("/");

    const candidateList = await CandidateFactory.methods
      .returnCandidateList(this.props.ward)
      .call();
    this.setState({ candidateAddressList: candidateList });
    console.log(this.state.candidateAddressList);
    this.createCandidateList();
  }

  createCandidateList = async () => {
    let candidateList = [];
    for (let i = 0; i < this.state.candidateAddressList.length; i++) {
      const candidate = await Candidate(this.state.candidateAddressList[i])
        .methods.returnCandidateInfo()
        .call();
      const candidateInfo = {
        name: candidate[0],
        aadhaar: candidate[1],
        party: candidate[2],
        address: this.state.candidateAddressList[i]
      };
      console.log(candidateInfo);
      candidateList.push(candidateInfo);
    }
    this.setState({ candidateList: candidateList });
    console.log(this.state.candidateList);
  };

  vote = async (candidateAddress, candidateName) => {
    this.setState({ message: `Voting` });
    await Ballot.methods
      .vote(candidateAddress, this.props.voterAddress)
      .send({ from: this.props.admin });
    this.setState({
      message: `You have successfully voted: ${candidateName}`
    });
    this.props.history.push("/voter/details");
  };

  renderCards() {
    let i = 0;
    return this.state.candidateList.map(candidate => (
      <div className="card" key={candidate.aadhaar}>
        <div className="content">
          <div className="header">{candidate.name}</div>
          <div className="description">{candidate.party}</div>
        </div>
        <Button
          className="ui bottom attached button"
          onClick={() => this.vote(candidate.address, candidate.name)}
        >
          <i className="add icon" />
          Vote
        </Button>
      </div>
    ));
  }

  render() {
    return (
      <div
        style={{
          backgroundColor: "#ffffff"
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh"
          }}
        >
          <link
            rel="stylesheet"
            href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
          />
          <Container>
            <h2 style={{ marginTop: "20px" }}>Candidate List of Your Ward</h2>
            <div className="ui cards"> {this.renderCards()} </div>
          </Container>
          <h1>{this.message}</h1>
        </div>
      </div>
    );
  }
}

const mapStatetoProps = state => {
  const { isLoggedIn, aadhaar, voterAddress, admin, ward } = state;
  return {
    isLoggedIn,
    aadhaar,
    voterAddress,
    admin,
    ward
  };
};

export default connect(
  mapStatetoProps,
  null
)(CandidateList);
