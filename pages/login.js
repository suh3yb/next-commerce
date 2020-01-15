import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button, Form, Icon, Message, Segment } from 'semantic-ui-react';
import catchErrors from '../utils/catchErrors';

const INITIAL_USER = {
  email: '',
  password: '',
};

const Login = () => {
  const [user, setUser] = useState(INITIAL_USER);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const isUser = Object.values(user).every(elem => Boolean(elem));
    setDisabled(!isUser);
  }, [user]);

  const handleChange = event => {
    const { name, value } = event.target;
    setUser(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async event => {
    try {
      event.preventDefault();
      setLoading(true);
      setError('');
    } catch (error) {
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Message
        attached
        icon="privacy"
        header="Welcome Back!"
        content="Login with email and password"
        color="blue"
      />
      <Form error={Boolean(error)} loading={loading} onSubmit={handleSubmit}>
        <Message error header="Oops!" content={error} />
        <Segment>
          <Form.Input
            fluid
            icon="envelope"
            iconPosition="left"
            label="Email"
            placeholder="Email"
            name="email"
            type="email"
            value={user.email}
            onChange={handleChange}
          />
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            label="Password"
            placeholder="Password"
            name="password"
            type="password"
            value={user.password}
            onChange={handleChange}
          />
          <Button
            disabled={disabled || loading}
            icon="sign in"
            type="submit"
            color="orange"
            content="Login"
          />
        </Segment>
      </Form>
      <Message attached="bottom" warning>
        <Icon name="help" />
        New user?{' '}
        <Link href="/signup">
          <a>Signup here</a>
        </Link>{' '}
        instead.
      </Message>
    </>
  );
};

export default Login;
