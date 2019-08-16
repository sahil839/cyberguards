import React, { Component } from "react";
import { Header,Button, Checkbox, Form, Container, Card, Grid } from "semantic-ui-react";
class LoginForm extends Component {
 
  render() {
    return (
//       <Container>
//         <link
//           rel="stylesheet"
//           href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
//         />
//         <Header as='h1' textAlign='center'>
//       Result Ward Elections 2019
//     </Header>
//         <Header as='h2' textAlign='center'>
//       Winning Candidate from Ward No. 2
//     </Header>
//     <div class="ui centered cards" textAlign='center'>
//   <div class="ui card">
//     <div class="content">
//       <div class="header">Geetesh Gupta</div>
//       <div class="meta">Bhartiya Janta Party</div>
//       <div class="description">
//         Total Vote Count: 20000
//       </div>
//     </div>
//   </div>
//   </div>
       <Container>
           <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
        />

<Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
    <Header as='h1' textAlign='center' style={{ margin: '20px'}}>
      Result Ward Elections 2019
    </Header>
        <Header as='h2' textAlign='center' style={{ marginBottom: '20px'}}>
      Winning Candidate from Ward No. 2
    </Header>
    <div class="ui centered cards" style={{ margin: '20px'}}>
  <div class="ui card">
    <div class="content">
      <Header as='h1' style={{ margin: '20px'}}>Geetesh Gupta</Header>
      <Header as='h2' style={{ margin: '20px'}}>Bhartiya Janta Party</Header>
      <Header as='h3' style={{ margin: '20px'}}>
        Total Vote Count: 20000
      </Header>
    </div>
  </div>
  </div>
    </Grid.Column>
  </Grid>
  </Container>
    );
  }
}

export default LoginForm;
