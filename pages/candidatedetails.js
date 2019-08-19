import React, { Component } from "react";
import { Card, Button, Container } from "semantic-ui-react";
import Candidate from "../blockvote/deployed/candidate";
import CandidateFactory from "../blockvote/deployed/candidate_factory";
import VoterFactory from "../blockvote/deployed/voter_factory";
import Ballot from "../blockvote/deployed/ballot";
import web3 from "../blockvote/deployed/web3";

class CampaignIndex extends Component {
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
    const accounts = await web3.eth.getAccounts();
    this.setState({ admin: accounts[0] });
    const candidateList = await CandidateFactory.methods
      .returnCandidateList(this.props.ward)
      .call();
    console.log(candidateList);
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
    console.log(candidateList);
    this.setState({ candidateList: candidateList });
    console.log(this.state.candidateList);
  };

  vote = async candidate => {
    console.log(candidate);
    const voterAddress = await VoterFactory.methods
      .returnVoterAddress(2)
      .call();
    await Ballot.methods
      .vote(candidate, voterAddress)
      .send({ from: this.state.admin });
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
          onClick={()=>this.vote(candidate.address)}
        >
          <i className="add icon" />
          Vote
        </Button>
      </div>
    ));
    // return <Card.Group items={items} />;
  }

  render() {
    return (
      <div>
        <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
        />
        <Container>
          <h2 style={{ marginTop: "20px" }}>Candidate List of Your Ward</h2>
          <div className="ui cards"> {this.renderCards()} </div>
          {/* <Button onClick={this.createCandidateList} /> */}
        </Container>
      </div>
    );
  }
}
export default CampaignIndex;
