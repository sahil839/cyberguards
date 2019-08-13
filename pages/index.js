import React, { Component } from 'react';
import { Button, Checkbox, Form, Container } from 'semantic-ui-react';

class LoginForm extends Component {
  render () {
    return (
      <Container>
      <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
      <Form>
    <Form.Field>
      <label>Aadhar Number</label>
      <input placeholder='Aadhar Number' />
    </Form.Field>
    <Form.Field>
      <Checkbox label='I agree to the Terms and Conditions' />
    </Form.Field>
    <Button type='submit'>Login</Button>
  </Form>
  </Container>
  );
  }
}

export default LoginForm
