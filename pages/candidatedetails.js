import React, { Component } from 'react';
import { Card, Button, Container } from 'semantic-ui-react';
// import factory from '../ethereum/factory';
// import Layout from '../components/Layout';
// import { Link } from '../routes';

class CampaignIndex extends Component {
    static getInitialProps(){
        const candidates = [
        {
            name: "Sahil",
            aadhar: "545834959345830"
        } , 
        {
            name: "Mayank",
            aadhar: "353453465346365"
        }
    ]
    return {candidates};
}

  renderCampaigns() {
    return this.props.candidates.map(candidate =>
            <div class="card">
            <div class="content">
              <div class="header">{candidate.name}</div>
              <div class="description">
                {candidate.aadhar}
              </div>
            </div>
            <div class="ui bottom attached button">
              <i class="add icon"></i>
              Vote
            </div>
          </div>
    )
}

  render() {
    return (
        <div>
            <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
        />
        <Container>
          <h2 style={{ marginTop: '20px' }}>Candidate List of Your Ward</h2>
          <div class = "ui cards">
          {this.renderCampaigns()}
          </div>
          </Container> 
        </div>
    );
  }
}
export default CampaignIndex;