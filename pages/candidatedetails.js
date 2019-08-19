import React, { Component } from "react";
import { Card, Button, Container } from "semantic-ui-react";
import Candidate from "../blockvote/deployed/candidate";
import CandidateFactory from "../blockvote/deployed/candidate_factory";
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
        ward: candidate[1],
        party: candidate[2],
        key: candidate[3]
      };
      console.log(candidateInfo);
      candidateList.push(candidateInfo);
    }
    console.log(candidateList);
    this.setState({ candidateList: candidateList });
    console.log(this.state.candidateList);
  };

  renderCards() {
    return this.state.candidateList.map(candidate => (
      <div className="card" key={candidate.party}>
        <div className="content">
          <div className="header">{candidate.name}</div>
          <div className="party">{candidate.party}</div>
        </div>
        <div className="ui bottom attached button">
          <i className="add icon" />
          Vote
        </div>
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
